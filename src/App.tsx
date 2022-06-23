import React, { useState } from 'react';
import './App.css';
import {
  createTheme, ThemeProvider, PaletteMode, styled,
} from '@mui/material';
import SelectedNoteController from './editor/selected-note-controller';
import EventEmitter from './editor/ui-actions/event-emitter';
import { EditorUIEvent } from './editor/ui-actions/editor-ui-event';
import EditorActions from './editor/editor-actions/editor-command-delegator/editor-actions';
import { EditorActionEvent, EditorActionResult } from './editor/editor-actions/editor-action-event';
import { EditorControls, BendState } from './components/editor-controls/editor-controls';
import EditorCursor from './components/editor-cursor/editor-cursor';
import EditorPlayerControls from './components/editor-player-controls/editor-player-controls';
import AlphaTabViewport from './components/alphatab-viewport/alphatab-viewport';
import { ScoreInfo } from './editor/editor-actions/actions/set-score-info/score-info';
import { getBendState } from './editor/editor-actions/actions/set-bend/set-bend-lookup-table';
import { ColorModeContext } from './editor/color-mode-context';
import EditorLeftMenu from './components/editor-left-menu';
import {
  AccentuationType,
  AlphaTabApi,
  Duration,
  DynamicValue,
  HarmonicType,
  PickStroke,
  Score,
  ScoreRenderer,
  Track,
} from './alphatab-types/alphatab-types';
import { DialogContext } from './editor/dialog-context';

function useForceUpdate() {
  const [_, setValue] = useState(0); // integer state
  return () => setValue((value) => value + 1); // update the state to force render
}

const editorActions: EditorActions = new EditorActions();
let selectedNoteController!: SelectedNoteController;
let api!: AlphaTabApi;

const Body = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : 'inherit',
  height: '100vh',
}));

export default function App() {
  const forceUpdate = useForceUpdate();

  const [selectedTrackIndex, setSelectedTrackIndex] = useState(0);

  const setupWithApi = (newApi: AlphaTabApi) => {
    // newApi.metronomeVolume = 1;
    // newApi.countInVolume = 1;
    api = newApi;
    new EventEmitter(api.renderer as ScoreRenderer, onEditorUIEvent);
    selectedNoteController = new SelectedNoteController(api.renderer as ScoreRenderer);
  };

  const handlerActionResult = (result: EditorActionResult) => {
    if (result.requiresRerender) {
      api.render();
    }
    if (result.requiresMidiUpdate) {
      // loadMidiForScore is a private function.
      (api as any).loadMidiForScore();
    }
  };

  const dispatchAction = (action: EditorActionEvent) => {
    const result = editorActions.doAction(action);
    handlerActionResult(result);
  };

  const onEditorUIEvent = (UIeventData: EditorUIEvent) => {
    console.log(UIeventData);
    if (UIeventData.type === 'string-mouse-down') {
      selectedNoteController.setSelectedSlot({
        string: UIeventData.data.stringNumber,
        beat: UIeventData.data.beat,
      });
    }
    if (UIeventData.type === 'note-mouse-down') {
      selectedNoteController.toggleNoteSelection(UIeventData.data.note);
    }
    if (UIeventData.type === 'delete-selected-note') {
      const currentSelectedNote = selectedNoteController.getSelectedNote();
      if (currentSelectedNote) {
        dispatchAction({ type: 'remove-note', data: { note: currentSelectedNote } });
        selectedNoteController.setSelectedSlot(null);
      }
    }
    if (UIeventData.type === 'move-cursor-right' && selectedNoteController.hasSelectedSlot()) {
      UIeventData.rawEvent.preventDefault();
      const moved = selectedNoteController.moveSelectedNoteRight();
      if (!moved) {
        const currentBeat = selectedNoteController.getSelectedSlot()?.beat;
        if (currentBeat) {
          const newBeat = new alphaTab.model.Beat();
          dispatchAction({ type: 'add-beat', data: { currentBeat, newBeat } });
        }
      }
    }
    if (UIeventData.type === 'move-cursor-left' && selectedNoteController.hasSelectedSlot()) {
      UIeventData.rawEvent.preventDefault();
      selectedNoteController.moveSelectedNoteLeft();
    }
    if (UIeventData.type === 'move-cursor-up' && selectedNoteController.hasSelectedSlot()) {
      UIeventData.rawEvent.preventDefault();
      selectedNoteController.moveSelectedNoteUp();
    }
    if (UIeventData.type === 'move-cursor-down' && selectedNoteController.hasSelectedSlot()) {
      UIeventData.rawEvent.preventDefault();
      selectedNoteController.moveSelectedNoteDown();
    }
    if (UIeventData.type === 'deselect-cursor' && selectedNoteController.hasSelectedSlot()) {
      UIeventData.rawEvent.preventDefault();
      selectedNoteController.setSelectedSlot(null);
    }
    if (UIeventData.type === 'undo-action') {
      undo();
    }
    if (UIeventData.type === 'redo-action') {
      redo();
    }

    forceUpdate();
  };

  const onAlphatabRenderFinished = () => {
    // TODO: It looks like alphaTab will emit the render finished event before it finishes updating the boundsLookup.
    // Needs to investigate if that's the case or something else, and how to remove this timeout
    setTimeout(() => {
      forceUpdate();
    }, 50);
  };

  const undo = () => {
    const result = editorActions.undoAction();
    handlerActionResult(result);
    forceUpdate();
  };

  const redo = () => {
    const result = editorActions.redoAction();
    handlerActionResult(result);
    forceUpdate();
  };

  const togglePalmMute = () => {
    const selectedNote = selectedNoteController.getSelectedNote();
    if (!selectedNote) {
      return;
    }
    dispatchAction({ type: 'set-palm-mute', data: { note: selectedNote, isPalmMute: !selectedNote.isPalmMute } });
    forceUpdate();
  };

  const playPause = () => {
    api.playPause();
    forceUpdate();
  };

  const setCountIn = (countIn: boolean) => {
    if (api) {
      api.countInVolume = countIn ? 1 : 0;
      forceUpdate();
    }
  };

  const setMetronome = (metronome: boolean) => {
    if (api) {
      api.metronomeVolume = metronome ? 1 : 0;
      forceUpdate();
    }
  };

  const setText = (text: string) => {
    const beat = selectedNoteController.getSelectedSlot()?.beat;
    if (!beat) {
      return;
    }
    dispatchAction({ type: 'set-text', data: { text, beat } });
  };

  const setBend = (bend: BendState) => {
    const selectedNote = selectedNoteController.getSelectedNote();
    if (!selectedNote) {
      return;
    }
    dispatchAction({ type: 'set-bend', data: { ...bend, note: selectedNote } });
  };

  const newTrack = (params: { name: string }) => {
    if (!api.score) {
      return;
    }
    dispatchAction({ type: 'add-track', data: { score: api.score, track: { name: params.name } } });
  };

  const currentSelectedBend = (): BendState | null => {
    const selectedNote = selectedNoteController?.getSelectedNote();
    if (!selectedNote) {
      return null;
    }
    return getBendState(selectedNote);
  };

  const currentFret = (): number | null => selectedNoteController?.getSelectedNote()?.fret ?? null;

  const setFret = (fret: number) => {
    const selectedSlot = selectedNoteController.getSelectedSlot();
    if (!selectedSlot) {
      return;
    }
    if (selectedSlot?.note) {
      dispatchAction({ type: 'set-fret', data: { note: selectedSlot.note, fret } });
    } else {
      const note = new alphaTab.model.Note();
      note.fret = fret;
      note.string = selectedSlot?.string;
      dispatchAction({ type: 'add-note', data: { beat: selectedSlot.beat, note } });
      selectedNoteController.updateCurrentSelection();
    }
  };

  const currentSelectedBeatText = (): string | null => selectedNoteController?.getSelectedSlot()?.beat?.text ?? null;

  const isCurrentSelectedNotePalmMute = (): boolean => selectedNoteController?.getSelectedSlot()?.note?.isPalmMute ?? false;

  const isLeftHandTapNote = (): boolean => selectedNoteController?.getSelectedNote()?.isLeftHandTapped ?? false;

  const isVibrato = (): boolean => selectedNoteController?.getSelectedNote()?.vibrato !== 0 ?? false;

  const hasSelectedNote = (): boolean => !!selectedNoteController?.getSelectedSlot()?.note;

  const hasSelectedBeat = (): boolean => !!selectedNoteController?.getSelectedSlot()?.beat;

  const currentSelectedBeatDuration = (): Duration | null => selectedNoteController?.getSelectedSlot()?.beat?.duration ?? null;

  const currentSelectedBeatDynamics = (): DynamicValue | null => selectedNoteController?.getSelectedSlot()?.beat?.dynamics ?? null;

  const currentSelectedBeatPickStroke = (): PickStroke | null => selectedNoteController?.getSelectedSlot()?.beat?.pickStroke ?? null;

  const currentSelectedNoteIsGhost = (): boolean | null => selectedNoteController?.getSelectedNote()?.isGhost ?? null;

  const currentSelectedNoteAccentuation = (): AccentuationType | null => selectedNoteController?.getSelectedNote()?.accentuated ?? null;

  const currentSelectedNoteHarmonicType = (): HarmonicType | null => selectedNoteController?.getSelectedNote()?.harmonicType ?? null;

  const currentSelectedNoteDead = (): boolean | null => selectedNoteController?.getSelectedNote()?.isDead ?? null;

  const setDynamics = (dynamics: DynamicValue): void => {
    const beat = selectedNoteController?.getSelectedSlot()?.beat;
    if (!beat) {
      return;
    }
    dispatchAction({ type: 'set-dynamics', data: { beat, dynamics } });
  };

  const setTempo = (tempo: number): void => {
    if (!api.score) {
      return;
    }
    dispatchAction({ type: 'set-tempo', data: { tempo, score: api.score } });
  };

  const setGhostNote = (isGhost: boolean): void => {
    const note = selectedNoteController?.getSelectedNote();
    if (!note) {
      return;
    }
    dispatchAction({ type: 'set-ghost-note', data: { note, isGhost } });
  };

  const setAccentuationNote = (accentuation: AccentuationType): void => {
    const note = selectedNoteController?.getSelectedNote();
    if (!note) {
      return;
    }
    dispatchAction({ type: 'set-accentuation', data: { note, accentuation } });
  };

  const setPickStroke = (pickStroke: number): void => {
    const beat = selectedNoteController?.getSelectedSlot()?.beat;
    if (!beat) {
      return;
    }
    dispatchAction({ type: 'set-pick-stroke', data: { beat, pickStroke } });
  };

  const setHarmonicType = (harmonicType: HarmonicType): void => {
    const note = selectedNoteController?.getSelectedNote();
    if (!note) {
      return;
    }
    dispatchAction({ type: 'set-harmonic', data: { note, harmonic: harmonicType } });
  };

  const print = () => {
    api.print('', null);
  };

  const setScoreInfo = (scoreInfo: ScoreInfo) => {
    const { score } = api;
    if (!score) {
      return;
    }
    dispatchAction({ type: 'set-score-info', data: { score, scoreInfo } });
  };

  const score = (): Score | null => api?.score;

  const setDuration = (duration: Duration) => {
    const beat = selectedNoteController.getSelectedSlot()?.beat;
    if (!beat) {
      return;
    }
    dispatchAction({ type: 'set-duration', data: { beat, duration } });
  };

  const setVolume = (volume: number) => {
    api.masterVolume = volume;
  };

  const setSpeed = (speed: number) => {
    api.playbackSpeed = speed;
  };

  const setDeadNote = (value: boolean) => {
    const note = selectedNoteController.getSelectedNote();
    if (!note) {
      return;
    }
    dispatchAction({ type: 'set-dead-note', data: { note, isDeadNote: value } });
  };

  const setTapNote = (value: boolean) => {
    const note = selectedNoteController.getSelectedNote();
    if (!note) {
      return;
    }
    dispatchAction({ type: 'set-tap', data: { note, isLeftHandTap: value } });
  };

  const setVibratoNote = (value: boolean) => {
    const note = selectedNoteController.getSelectedNote();
    if (!note) {
      return;
    }
    dispatchAction({ type: 'set-vibrato', data: { note, isVibrato: value } });
  };

  const selectTrack = (track: Track) => {
    api.renderTracks([track]);
    setSelectedTrackIndex(track.index);
    const lineCount = track.staves[0]?.standardNotationLineCount;
    if (lineCount) {
      selectedNoteController.setNumberOfStrings(lineCount);
    }
  };

  const openFile = (file: File) => {
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      api.load(event.target?.result, [0]);
    };
    fileReader.readAsArrayBuffer(file);
  };

  const exportGuitarPro = () => {
    const exporter = new alphaTab.exporter.Gp7Exporter();
    const data = exporter.export(api.score!, api.settings);
    const a = document.createElement('a');
    a.download = `${api?.score?.title || 'File'}.gp`;
    a.href = URL.createObjectURL(new Blob([data]));
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const newFile = () => {
    api.tex('\\title \'New score\' . 3.3.4');
  };

  const exportMidi = () => {
    api.downloadMidi();
  };

  const [paletteMode, setPaletteMode] = useState<PaletteMode>('dark');

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setPaletteMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () => createTheme({
      palette: {
        mode: paletteMode,
      },
    }),
    [paletteMode],
  );

  const [hasDialog, setHasDialog] = useState(false);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <DialogContext.Provider value={{ hasDialog, setHasDialog }}>
        <ThemeProvider theme={theme}>
          <Body>
            <div className="app-container">
              <div className="app-content">
                <EditorLeftMenu
                  score={api?.score}
                  onNewTrack={newTrack}
                  selectedTrackIndex={selectedTrackIndex}
                  selectTrack={selectTrack}
                />
                <div className="app-editor-controls">
                  <EditorControls
                    setScoreInfo={setScoreInfo}
                    setText={setText}
                    setHarmonicType={setHarmonicType}
                    setTempo={setTempo}
                    newFile={newFile}
                    open={openFile}
                    setDeadNote={setDeadNote}
                    isDeadNote={currentSelectedNoteDead()}
                    score={score()}
                    currentHarmonicType={currentSelectedNoteHarmonicType()}
                    currentPickStroke={currentSelectedBeatPickStroke()}
                    setPickStroke={setPickStroke}
                    setAccentuationNote={setAccentuationNote}
                    setGhostNote={setGhostNote}
                    isGhost={currentSelectedNoteIsGhost()}
                    isLeftHandTapNote={isLeftHandTapNote()}
                    isVibrato={isVibrato()}
                    setVibrato={setVibratoNote}
                    currentAccentuation={currentSelectedNoteAccentuation()}
                    hasSelectedBeat={hasSelectedBeat()}
                    setDynamics={setDynamics}
                    currentDynamics={currentSelectedBeatDynamics()}
                    setDuration={setDuration}
                    currentDuration={currentSelectedBeatDuration()}
                    setBend={setBend}
                    currentBend={currentSelectedBend()}
                    exportGuitarPro={exportGuitarPro}
                    exportMidi={exportMidi}
                    print={print}
                    hasSelectedNote={hasSelectedNote()}
                    isPalmMute={isCurrentSelectedNotePalmMute()}
                    currentText={currentSelectedBeatText()}
                    setTap={setTapNote}
                    togglePalmMute={() => togglePalmMute()}
                    canRedo={editorActions.canRedo()}
                    canUndo={editorActions.canUndo()}
                    undo={() => undo()}
                    redo={() => redo()}
                  />
                </div>
                <AlphaTabViewport
                  apiReady={setupWithApi}
                  renderFinished={onAlphatabRenderFinished}
                  playerStateChanged={() => forceUpdate()}
                >
                  <EditorCursor
                    hasDialogOpen={hasDialog}
                    fret={currentFret()}
                    setFret={(fret) => { setFret(fret); }}
                    bounds={selectedNoteController?.getNoteBounds()}
                  />
                </AlphaTabViewport>
              </div>
              <EditorPlayerControls
                onSpeedChange={setSpeed}
                onVolumeChange={setVolume}
                playPause={playPause}
                onCountInChange={setCountIn}
                onMetronomeChange={setMetronome}
                isCountIn={api?.countInVolume !== 0}
                isMetronome={api?.metronomeVolume !== 0}
                isPlaying={api?.playerState === 1}
              />
            </div>
          </Body>
        </ThemeProvider>
      </DialogContext.Provider>
    </ColorModeContext.Provider>
  );
}

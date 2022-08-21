import React, { useState } from 'react';
import useStateRef from 'react-usestateref';
import {
  styled,
} from '@mui/material';
import SelectedNoteController from '../editor/selected-note-controller';
import EventEmitter from '../editor/ui-actions/event-emitter';
import { EditorUIEvent } from '../editor/ui-actions/editor-ui-event';
import EditorActions from '../editor-actions/editor-command-delegator/editor-actions';
import { EditorActionResult } from '../editor-actions/editor-action-event';
import { EditorControls } from '../editor-skeleton/editor-controls/editor-controls';
import EditorCursor from '../editor-skeleton/editor-cursor/editor-cursor';
import EditorPlayerControls from '../editor-skeleton/editor-player-controls/editor-player-controls';
import AlphaTabViewport from '../editor-skeleton/alphatab-viewport/alphatab-viewport';
import EditorLeftMenu from '../editor-skeleton/editor-left-menu';
import {
  AlphaTabApi,
  Chord,
  Score,
  ScoreRenderer,
  Track,
} from '../alphatab-types/alphatab-types';
import EditorActionDispatcher from '../editor/editor-action-dispatcher';
import EditorScoreState from '../editor/editor-score-state';

function useForceUpdate() {
  const [_, setValue] = useState(0); // integer state
  return () => setValue((value) => value + 1); // update the state to force render
}

const editorActions: EditorActions = new EditorActions();
let selectedNoteController!: SelectedNoteController;
const editorActionDispatcher = new EditorActionDispatcher(
  editorActions,
  selectedNoteController,
  () => { },
);

const AppContainer = styled('div')({
  height: 'calc(100vh - 2px)',
  margin: '0 auto',
  border: '1px solid rgba(0, 0, 0, 0.12)',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  position: 'relative',
});

const AppContent = styled('div')({
  position: 'relative',
  overflow: 'hidden',
  flex: '1 1 auto',
});

const AppEditorControls = styled('div')({
  position: 'absolute',
  left: '90px',
  right: 0,
  zIndex: 999,
})

export default function Editor({ hasDialog }: { hasDialog: boolean }) {
  const forceUpdate = useForceUpdate();

  const [selectedTrackIndex, setSelectedTrackIndex] = useState(0);

  const [editorScoreState, setEditorScoreState] = useState(new EditorScoreState(selectedNoteController));

  const [api, setApi, apiRef] = useStateRef<AlphaTabApi | null>(null);

  const handlerActionResult = (result: EditorActionResult) => {
    if (result.requiresRerender) {
      apiRef.current?.render();
      setEditorScoreState(new EditorScoreState(selectedNoteController));
    }
    if (result.requiresMidiUpdate) {
      // loadMidiForScore is a private function so we cast to any
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (apiRef.current as any).loadMidiForScore();
    }
  };

  const setupWithApi = (newApi: AlphaTabApi) => {
    setApi(newApi);
    // eslint-disable-next-line no-new
    new EventEmitter(newApi.renderer as ScoreRenderer, onEditorUIEvent);
    selectedNoteController = new SelectedNoteController();
    editorActionDispatcher.api = newApi;
    editorActionDispatcher.onResult = handlerActionResult;
    editorActionDispatcher.selectedNoteController = selectedNoteController;
    forceUpdate();
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
      editorActionDispatcher.removeNote();
    }
    if (UIeventData.type === 'move-cursor-next-bar' && selectedNoteController.hasSelectedSlot()) {
      UIeventData.rawEvent.preventDefault();
      selectedNoteController.moveNextBar();
    }
    if (UIeventData.type === 'move-cursor-previous-bar' && selectedNoteController.hasSelectedSlot()) {
      UIeventData.rawEvent.preventDefault();
      const moved = selectedNoteController.movePreviousBar();
      if (!moved) {
        selectedNoteController.moveStartOfCurrentBar();
      }
    }
    if (UIeventData.type === 'move-cursor-right' && selectedNoteController.hasSelectedSlot()) {
      UIeventData.rawEvent.preventDefault();
      const moved = selectedNoteController.moveNextBeat();
      if (!moved) {
        editorActionDispatcher.addBeat();
        selectedNoteController.moveNextBeat();
      }
    }
    if (UIeventData.type === 'move-cursor-left' && selectedNoteController.hasSelectedSlot()) {
      UIeventData.rawEvent.preventDefault();
      selectedNoteController.movePreviousBeat();
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
      editorActionDispatcher.undo();
    }
    if (UIeventData.type === 'redo-action') {
      editorActionDispatcher.redo();
    }

    forceUpdate();
    setEditorScoreState(new EditorScoreState(selectedNoteController));
  };

  const onAlphatabRenderFinished = () => {
    // TODO: It looks like alphaTab will emit the render finished event before it finishes updating the boundsLookup.
    // Needs to investigate if that's the case or something else, and how to remove this timeout
    setTimeout(() => {
      forceUpdate();
    }, 50);
  };

  const playPause = () => {
    api?.playPause();
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

  const currentAvailableChords = (): Chord[] => {
    const chords = api?.score?.tracks[0].staves[0].chords;
    return Array.from(chords?.values() ?? []);
  };

  const print = () => {
    api?.print('', null);
  };

  const score = (): Score | null => api?.score ?? null;

  const setVolume = (volume: number) => {
    if (api) {
      api.masterVolume = volume;
    }
  };

  const setSpeed = (speed: number) => {
    if (api) {
      api.playbackSpeed = speed;
    }
  };

  const selectTrack = (track: Track) => {
    api?.renderTracks([track]);
    setSelectedTrackIndex(track.index);
    const lineCount = track.staves[0]?.standardNotationLineCount;
    if (lineCount) {
      selectedNoteController.setNumberOfStrings(lineCount);
    }
  };

  const openFile = (file: File) => {
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      api?.load(event.target?.result, [0]);
    };
    fileReader.readAsArrayBuffer(file);
  };

  const exportGuitarPro = () => {
    if (!api) {
      return;
    }
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
    api?.tex('\\title \'New score\' . 3.3.4');
  };

  const exportMidi = () => {
    api?.downloadMidi();
  };

  return (
    <AppContainer>
      <AppContent>
        <EditorLeftMenu
          score={api?.score ?? null}
          onNewTrack={editorActionDispatcher.newTrack}
          onTrackEdit={editorActionDispatcher.editTrack}
          selectedTrackIndex={selectedTrackIndex}
          selectTrack={selectTrack}
        />
        <AppEditorControls>
          <EditorControls
            newFile={newFile}
            open={openFile}
            score={score()}
            selectedTrackIndex={selectedTrackIndex}
            currentAvailableChords={currentAvailableChords()}
            editorScoreState={editorScoreState}
            actionDispatcher={editorActionDispatcher}
            exportGuitarPro={exportGuitarPro}
            exportMidi={exportMidi}
            print={print}
            canRedo={editorActions.canRedo()}
            canUndo={editorActions.canUndo()}
          />
        </AppEditorControls>
        <AlphaTabViewport
          apiReady={setupWithApi}
          renderFinished={onAlphatabRenderFinished}
          playerStateChanged={() => forceUpdate()}
        >
          <EditorCursor
            hasDialogOpen={hasDialog}
            fret={editorScoreState.selectionFret}
            setFret={editorActionDispatcher.setFret}
            bounds={selectedNoteController?.getNoteBounds(api?.renderer as ScoreRenderer)}
          />
        </AlphaTabViewport>
      </AppContent>
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
    </AppContainer>
  );
}

import { AlphaTabApi } from '@coderline/alphatab';
import {
  AccentuationType,
  Beat,
  Chord,
  Duration,
  DynamicValue,
  Fermata,
  HarmonicType,
  Note,
  SlideInType,
  SlideOutType,
  Track,
  VibratoType,
} from '../alphatab-types/alphatab-types';
import { BendState } from '../editor-skeleton/editor-controls/editor-controls';
import TrackInfo from '../editor-actions/actions/edit-track/track-info';
import { ScoreInfo } from '../editor-actions/actions/set-score-info/score-info';
import { EditorActionEvent, EditorActionResult } from '../editor-actions/editor-action-event';
import EditorActions from '../editor-actions/editor-command-delegator/editor-actions';
import SelectedNoteController from './selected-note-controller';

class EditorActionDispatcher {
  constructor(
    public actions: EditorActions,
    public selectedNoteController: SelectedNoteController,
    public onResult: (arg0: EditorActionResult) => void,
  ) {
  }

  private batchResult: EditorActionResult | null = null;

  public api: AlphaTabApi | undefined;

  selectedBeat = (): Beat | null => this.selectedNoteController?.getSelectedSlot()?.beat ?? null;

  selectedNote = (): Note | null => this.selectedNoteController?.getSelectedSlot()?.note ?? null;

  doAction = (action: EditorActionEvent) => {
    const result = this.actions.doAction(action);
    if (this.batchResult === null) {
      this.batchResult = result;
    } else {
      this.batchResult.requiresMidiUpdate = this.batchResult.requiresMidiUpdate || result.requiresMidiUpdate;
      this.batchResult.requiresRerender = this.batchResult.requiresRerender || result.requiresRerender;
    }
  };

  applyActions = () => {
    if (this.batchResult) {
      this.onResult(this.batchResult);
    }
    this.batchResult = null;
  }

  doAndApplyAction = (action: EditorActionEvent) => {
    const result = this.actions.doAction(action);
    this.onResult(result);
  };

  setHammer = (hammerOrPull: boolean): void => {
    const note = this.selectedNote();
    if (!note) {
      return;
    }
    this.doAndApplyAction({ type: 'set-hammer', data: { note, value: hammerOrPull } });
  };

  setSlide = (slide: boolean): void => {
    const note = this.selectedNote();
    if (!note) {
      return;
    }
    this.doAndApplyAction({ type: 'set-slide', data: { note, value: slide } });
  };

  setSlideIn = (slide: SlideInType): void => {
    const note = this.selectedNote();
    if (!note) {
      return;
    }
    this.doAndApplyAction({ type: 'set-slide-in', data: { note, value: slide } });
  };

  setSlideOut = (slide: SlideOutType): void => {
    const note = this.selectedNote();
    if (!note) {
      return;
    }
    this.doAndApplyAction({ type: 'set-slide-out', data: { note, value: slide } });
  };

  setStaccato = (staccato: boolean): void => {
    const note = this.selectedNote();
    if (!note) {
      return;
    }
    this.doAndApplyAction({ type: 'set-staccato', data: { note, value: staccato } });
  };

  setDynamics = (dynamics: DynamicValue): void => {
    const beat = this.selectedBeat();
    if (!beat) {
      return;
    }
    this.doAndApplyAction({ type: 'set-dynamics', data: { beat, value: dynamics } });
  };

  setTempo = (tempo: number): void => {
    if (!this.api?.score) {
      return;
    }
    this.doAndApplyAction({ type: 'set-tempo', data: { tempo, score: this.api.score } });
  };

  setGhostNote = (isGhost: boolean): void => {
    const note = this.selectedNote();
    if (!note) {
      return;
    }
    this.doAndApplyAction({ type: 'set-ghost-note', data: { note, value: isGhost } });
  };

  setAccentuationNote = (accentuation: AccentuationType): void => {
    const note = this.selectedNote();
    if (!note) {
      return;
    }
    this.doAndApplyAction({ type: 'set-accentuation', data: { note, value: accentuation } });
  };

  setPickStroke = (pickStroke: number): void => {
    const beat = this.selectedBeat();
    if (!beat) {
      return;
    }
    this.doAndApplyAction({ type: 'set-pick-stroke', data: { beat, value: pickStroke } });
  };

  setHarmonicType = (harmonicType: HarmonicType): void => {
    const note = this.selectedNote();
    if (!note) {
      return;
    }
    this.doAndApplyAction({ type: 'set-harmonic', data: { note, value: harmonicType } });
  };

  setScoreInfo = (scoreInfo: ScoreInfo) => {
    const score = this.api?.score;
    if (!score) {
      return;
    }
    this.doAndApplyAction({ type: 'set-score-info', data: { score, scoreInfo } });
  };

  setDuration = (duration: Duration) => {
    const beat = this.selectedBeat();
    if (!beat) {
      return;
    }
    this.doAndApplyAction({ type: 'set-duration', data: { beat, value: duration } });
  };

  setDeadNote = (value: boolean) => {
    const note = this.selectedNote();
    if (!note) {
      return;
    }
    this.doAndApplyAction({ type: 'set-dead-note', data: { note, value } });
  };

  setTapNote = (value: boolean) => {
    const note = this.selectedNote();
    if (!note) {
      return;
    }
    this.doAndApplyAction({ type: 'set-tap', data: { note, value } });
  };

  setTieNote = (value: boolean) => {
    const note = this.selectedNote();
    if (!note) {
      return;
    }
    this.doAndApplyAction({ type: 'set-tie', data: { note, value } });
  };

  setVibratoNote = (vibrato: VibratoType) => {
    const note = this.selectedNote();
    if (!note) {
      return;
    }
    this.doAndApplyAction({ type: 'set-vibrato', data: { note, value: vibrato } });
  };

  setText = (text: string) => {
    const beat = this.selectedBeat();
    if (!beat) {
      return;
    }
    this.doAndApplyAction({ type: 'set-text', data: { value: text, beat } });
  };

  setBend = (bend: BendState) => {
    const note = this.selectedNote();
    if (!note) {
      return;
    }
    this.doAndApplyAction({ type: 'set-bend', data: { value: bend, note } });
  };

  setPalmMute = (isPalmMute: boolean) => {
    const note = this.selectedNote();
    if (!note) {
      return;
    }
    this.doAndApplyAction({ type: 'set-palm-mute', data: { note, value: isPalmMute } });
  };

  setLetRing = (isLetRing: boolean) => {
    const note = this.selectedNote();
    if (!note) {
      return;
    }
    this.doAndApplyAction({ type: 'set-let-ring', data: { note, value: isLetRing } });
  };

  newTrack = (params: TrackInfo) => {
    if (!this.api?.score) {
      return;
    }
    this.doAndApplyAction({ type: 'add-track', data: { score: this.api.score, trackInfo: params } });
  };

  setOpenRepeat = (openRepeat: boolean) => {
    const beat = this.selectedBeat();
    if (!beat) {
      return;
    }
    this.doAndApplyAction({ type: 'set-open-repeat', data: { beat, value: openRepeat } });
  };

  setCloseRepeat = (numberOfRepetitions: number) => {
    const beat = this.selectedBeat();
    if (!beat) {
      return;
    }
    this.doAndApplyAction({ type: 'set-close-repeat', data: { beat, value: numberOfRepetitions } });
  };

  editTrack = (track: Track, trackInfo: TrackInfo) => {
    if (!this.api?.score) {
      return;
    }
    this.doAndApplyAction({ type: 'edit-track', data: { track, trackInfo } });
  };

  removeTrack = (track: Track) => {
    this.doAndApplyAction({ type: 'remove-track', data: { track } });
  }

  setFret = (fret: number) => {
    const selectedSlot = this.selectedNoteController.getSelectedSlot();
    if (!selectedSlot) {
      return;
    }
    if (selectedSlot?.note) {
      this.doAndApplyAction({ type: 'set-fret', data: { note: selectedSlot.note, value: fret } });
    } else {
      const note = new alphaTab.model.Note();
      note.fret = fret;
      note.string = selectedSlot?.string;
      this.doAndApplyAction({ type: 'add-note', data: { beat: selectedSlot.beat, note } });
      this.selectedNoteController.updateCurrentSelection();
    }
  };

  removeNote = () => {
    const currentSelectedNote = this.selectedNote();
    if (currentSelectedNote) {
      this.doAndApplyAction({ type: 'remove-note', data: { note: currentSelectedNote } });
      this.selectedNoteController.setSelectedSlot({
        beat: currentSelectedNote.beat,
        string: currentSelectedNote.string,
      });
    }
  };

  addBeat = () => {
    const currentBeat = this.selectedBeat();
    if (currentBeat) {
      if (currentBeat.voice.beats.length === currentBeat.voice.bar.masterBar.timeSignatureNumerator) {
        const currentBar = currentBeat.voice.bar;
        this.doAndApplyAction({ type: 'add-bar', data: { currentBar } });
      } else {
        const newBeat = new alphaTab.model.Beat();
        this.doAndApplyAction({ type: 'add-beat', data: { currentBeat, newBeat } });
      }
    }
  };

  addBar = () => {
    let currentBeat = this.selectedBeat();
    if (currentBeat) {
      const missingBeats = currentBeat.voice.bar.masterBar.timeSignatureNumerator - currentBeat.voice.beats.length;
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < missingBeats; i++) {
        const newBeat = new alphaTab.model.Beat();
        this.doAction({ type: 'add-beat', data: { currentBeat, newBeat } });
        currentBeat = newBeat;
      }
      const currentBar = currentBeat.voice.bar;
      this.doAction({ type: 'add-bar', data: { currentBar } });
      this.applyActions();
    }
  };

  setChord = (chord: Chord | null) => {
    const currentBeat = this.selectedBeat();
    if (currentBeat) {
      this.doAndApplyAction({ type: 'set-chord', data: { beat: currentBeat, value: chord } });
    }
  };

  setFermata = (fermata: Fermata | null) => {
    const currentBeat = this.selectedBeat();
    if (currentBeat) {
      this.doAndApplyAction({ type: 'set-fermata', data: { beat: currentBeat, value: fermata } });
    }
  }

  undo = () => {
    const actionResult = this.actions.undoAction();
    this.onResult(actionResult);
  };

  redo = () => {
    const actionResult = this.actions.redoAction();
    this.onResult(actionResult);
  };
}

export default EditorActionDispatcher;

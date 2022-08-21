import { AlphaTabApi } from '@coderline/alphatab';
import {
  AccentuationType,
  Beat,
  Chord,
  Duration,
  DynamicValue,
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

  public api: AlphaTabApi | undefined;

  selectedBeat = (): Beat | null => this.selectedNoteController?.getSelectedSlot()?.beat ?? null;

  selectedNote = (): Note | null => this.selectedNoteController?.getSelectedSlot()?.note ?? null;

  dispatchAction = (action: EditorActionEvent) => {
    const result = this.actions.doAction(action);
    this.onResult(result);
  };

  setHammer = (hammerOrPull: boolean): void => {
    const note = this.selectedNote();
    if (!note) {
      return;
    }
    this.dispatchAction({ type: 'set-hammer', data: { note, value: hammerOrPull } });
  };

  setSlide = (slide: boolean): void => {
    const note = this.selectedNote();
    if (!note) {
      return;
    }
    this.dispatchAction({ type: 'set-slide', data: { note, value: slide } });
  };

  setSlideIn = (slide: SlideInType): void => {
    const note = this.selectedNote();
    if (!note) {
      return;
    }
    this.dispatchAction({ type: 'set-slide-in', data: { note, value: slide } });
  };

  setSlideOut = (slide: SlideOutType): void => {
    const note = this.selectedNote();
    if (!note) {
      return;
    }
    this.dispatchAction({ type: 'set-slide-out', data: { note, value: slide } });
  };

  setStaccato = (staccato: boolean): void => {
    const note = this.selectedNote();
    if (!note) {
      return;
    }
    this.dispatchAction({ type: 'set-staccato', data: { note, value: staccato } });
  };

  setDynamics = (dynamics: DynamicValue): void => {
    const beat = this.selectedBeat();
    if (!beat) {
      return;
    }
    this.dispatchAction({ type: 'set-dynamics', data: { beat, value: dynamics } });
  };

  setTempo = (tempo: number): void => {
    if (!this.api?.score) {
      return;
    }
    this.dispatchAction({ type: 'set-tempo', data: { tempo, score: this.api.score } });
  };

  setGhostNote = (isGhost: boolean): void => {
    const note = this.selectedNote();
    if (!note) {
      return;
    }
    this.dispatchAction({ type: 'set-ghost-note', data: { note, value: isGhost } });
  };

  setAccentuationNote = (accentuation: AccentuationType): void => {
    const note = this.selectedNote();
    if (!note) {
      return;
    }
    this.dispatchAction({ type: 'set-accentuation', data: { note, value: accentuation } });
  };

  setPickStroke = (pickStroke: number): void => {
    const beat = this.selectedBeat();
    if (!beat) {
      return;
    }
    this.dispatchAction({ type: 'set-pick-stroke', data: { beat, value: pickStroke } });
  };

  setHarmonicType = (harmonicType: HarmonicType): void => {
    const note = this.selectedNote();
    if (!note) {
      return;
    }
    this.dispatchAction({ type: 'set-harmonic', data: { note, value: harmonicType } });
  };

  setScoreInfo = (scoreInfo: ScoreInfo) => {
    const score = this.api?.score;
    if (!score) {
      return;
    }
    this.dispatchAction({ type: 'set-score-info', data: { score, scoreInfo } });
  };

  setDuration = (duration: Duration) => {
    const beat = this.selectedBeat();
    if (!beat) {
      return;
    }
    this.dispatchAction({ type: 'set-duration', data: { beat, value: duration } });
  };

  setDeadNote = (value: boolean) => {
    const note = this.selectedNote();
    if (!note) {
      return;
    }
    this.dispatchAction({ type: 'set-dead-note', data: { note, value } });
  };

  setTapNote = (value: boolean) => {
    const note = this.selectedNote();
    if (!note) {
      return;
    }
    this.dispatchAction({ type: 'set-tap', data: { note, value } });
  };

  setTieNote = (value: boolean) => {
    const note = this.selectedNote();
    if (!note) {
      return;
    }
    this.dispatchAction({ type: 'set-tie', data: { note, value } });
  };

  setVibratoNote = (vibrato: VibratoType) => {
    const note = this.selectedNote();
    if (!note) {
      return;
    }
    this.dispatchAction({ type: 'set-vibrato', data: { note, value: vibrato } });
  };

  setText = (text: string) => {
    const beat = this.selectedBeat();
    if (!beat) {
      return;
    }
    this.dispatchAction({ type: 'set-text', data: { value: text, beat } });
  };

  setBend = (bend: BendState) => {
    const note = this.selectedNote();
    if (!note) {
      return;
    }
    this.dispatchAction({ type: 'set-bend', data: { value: bend, note } });
  };

  setPalmMute = (isPalmMute: boolean) => {
    const note = this.selectedNote();
    if (!note) {
      return;
    }
    this.dispatchAction({ type: 'set-palm-mute', data: { note, value: isPalmMute } });
  };

  setLetRing = (isLetRing: boolean) => {
    const note = this.selectedNote();
    if (!note) {
      return;
    }
    this.dispatchAction({ type: 'set-let-ring', data: { note, value: isLetRing } });
  };

  newTrack = (params: TrackInfo) => {
    if (!this.api?.score) {
      return;
    }
    this.dispatchAction({ type: 'add-track', data: { score: this.api.score, trackInfo: params } });
  };

  setOpenRepeat = (openRepeat: boolean) => {
    const beat = this.selectedBeat();
    if (!beat) {
      return;
    }
    this.dispatchAction({ type: 'set-open-repeat', data: { beat, value: openRepeat } });
  };

  setCloseRepeat = (numberOfRepetitions: number) => {
    const beat = this.selectedBeat();
    if (!beat) {
      return;
    }
    this.dispatchAction({ type: 'set-close-repeat', data: { beat, value: numberOfRepetitions } });
  };

  editTrack = (track: Track, trackInfo: TrackInfo) => {
    if (!this.api?.score) {
      return;
    }
    this.dispatchAction({ type: 'edit-track', data: { track, trackInfo } });
  };

  removeTrack = (track: Track) => {
    this.dispatchAction({ type: 'remove-track', data: { track } });
  }

  setFret = (fret: number) => {
    const selectedSlot = this.selectedNoteController.getSelectedSlot();
    if (!selectedSlot) {
      return;
    }
    if (selectedSlot?.note) {
      this.dispatchAction({ type: 'set-fret', data: { note: selectedSlot.note, value: fret } });
    } else {
      const note = new alphaTab.model.Note();
      note.fret = fret;
      note.string = selectedSlot?.string;
      this.dispatchAction({ type: 'add-note', data: { beat: selectedSlot.beat, note } });
      this.selectedNoteController.updateCurrentSelection();
    }
  };

  removeNote = () => {
    const currentSelectedNote = this.selectedNote();
    if (currentSelectedNote) {
      this.dispatchAction({ type: 'remove-note', data: { note: currentSelectedNote } });
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
        this.dispatchAction({ type: 'add-bar', data: { currentBar } });
      } else {
        const newBeat = new alphaTab.model.Beat();
        this.dispatchAction({ type: 'add-beat', data: { currentBeat, newBeat } });
      }
    }
  };

  setChord = (chord: Chord | null) => {
    const currentBeat = this.selectedBeat();
    if (currentBeat) {
      this.dispatchAction({ type: 'set-chord', data: { beat: currentBeat, value: chord } });
    }
  };

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

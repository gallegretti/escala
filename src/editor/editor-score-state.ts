import {
  AccentuationType,
  Beat,
  Chord,
  Duration,
  DynamicValue,
  HarmonicType,
  Note,
  PickStroke,
} from '../alphatab-types/alphatab-types';
import { BendState } from '../components/editor-controls/editor-controls';
import { getBendState } from './editor-actions/actions/set-bend/set-bend-lookup-table';
import SelectedNoteController from './selected-note-controller';

/**
 * Class containing logic on how to get information regarding the current note and beat selection
 */
export default class EditorScoreState {
  constructor(
    public selectedNoteController: SelectedNoteController,
  ) {
  }

  get hasSelectedNote(): boolean {
    return !!this.selectedNoteController?.getSelectedSlot()?.note;
  }

  get hasSelectedBeat(): boolean {
    return !!this.selectedNoteController?.getSelectedSlot()?.beat;
  }

  get selectedBeat(): Beat | null {
    return this.selectedNoteController?.getSelectedSlot()?.beat ?? null;
  }

  get selectedNote(): Note | null {
    return this.selectedNoteController?.getSelectedSlot()?.note ?? null;
  }

  // State

  get isOpenRepeat(): boolean {
    return this.selectedBeat?.voice.bar.masterBar.isRepeatStart ?? false;
  }

  get numberOfRepetitions(): number {
    return this.selectedBeat?.voice.bar.masterBar.repeatCount ?? 0;
  }

  currentFret = (): number | null => this.selectedNoteController?.getSelectedNote()?.fret ?? null;

  currentSelectedBeatText = (): string | null => this.selectedBeat?.text ?? null;

  isCurrentSelectedNotePalmMute = (): boolean => this.selectedNote?.isPalmMute ?? false;

  isCurrentSelectedNoteTie = (): boolean => this.selectedNote?.isTieOrigin ?? false;

  isLeftHandTapNote = (): boolean => this.selectedNote?.isLeftHandTapped ?? false;

  isVibrato = (): boolean => this.selectedNote?.vibrato !== 0 ?? false;

  currentSelectedBeatDuration = (): Duration | null => this.selectedBeat?.duration ?? null;

  currentSelectedBeatDynamics = (): DynamicValue | null => this.selectedBeat?.dynamics ?? null;

  currentSelectedBeatPickStroke = (): PickStroke | null => this.selectedBeat?.pickStroke ?? null;

  currentSelectedNoteIsGhost = (): boolean | null => this.selectedNote?.isGhost ?? null;

  currentSelectedNoteAccentuation = (): AccentuationType | null => this.selectedNote?.accentuated ?? null;

  currentSelectedNoteHarmonicType = (): HarmonicType | null => this.selectedNote?.harmonicType ?? null;

  currentChord = () : Chord | null => this.selectedNote?.beat.chord ?? null;

  currentSelectedNoteDead = (): boolean | null => this.selectedNote?.isDead ?? null;

  currentSelectedNoteHammerOrPull = (): boolean | null => this.selectedNote?.isHammerPullOrigin ?? null;

  currentSelectedNoteSlide = (): boolean | null => (this.selectedNote?.slideOutType ?? 0) > 0;

  currentSelectedBend = (): BendState | null => {
    if (!this.selectedNote) {
      return null;
    }
    return getBendState(this.selectedNote);
  };
}

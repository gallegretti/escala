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
import { BendState } from '../editor-skeleton/editor-controls/editor-controls';
import { getBendState } from '../editor-actions/actions/set-bend/set-bend-lookup-table';
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

  get currentFret(): number | null {
    return this.selectedNote?.fret ?? null;
  }

  get currentSelectedBeatText(): string | null {
    return this.selectedBeat?.text ?? null;
  }

  get isCurrentSelectedNotePalmMute(): boolean {
    return this.selectedNote?.isPalmMute ?? false;
  }

  get isCurrentSelectedNoteTie(): boolean {
    return this.selectedNote?.isTieOrigin ?? false;
  }

  get isLeftHandTapNote(): boolean {
    return this.selectedNote?.isLeftHandTapped ?? false;
  }

  get isVibrato(): boolean {
    return this.selectedNote?.vibrato !== 0 ?? false;
  }

  get currentSelectedBeatDuration(): Duration | null {
    return this.selectedBeat?.duration ?? null;
  }

  get currentSelectedBeatDynamics(): DynamicValue | null {
    return this.selectedBeat?.dynamics ?? null;
  }

  get currentSelectedBeatPickStroke(): PickStroke | null {
    return this.selectedBeat?.pickStroke ?? null;
  }

  get currentSelectedNoteIsGhost(): boolean | null {
    return this.selectedNote?.isGhost ?? null;
  }

  get currentSelectedNoteAccentuation(): AccentuationType | null {
    return this.selectedNote?.accentuated ?? null;
  }

  get currentSelectedNoteHarmonicType(): HarmonicType | null {
    return this.selectedNote?.harmonicType ?? null;
  }

  get currentChord(): Chord | null {
    return this.selectedNote?.beat.chord ?? null;
  }

  get currentSelectedNoteDead(): boolean | null {
    return this.selectedNote?.isDead ?? null;
  }

  get currentSelectedNoteHammerOrPull(): boolean | null {
    return this.selectedNote?.isHammerPullOrigin ?? null;
  }

  get currentSelectedNoteSlide(): boolean | null {
    return (this.selectedNote?.slideOutType ?? 0) > 0;
  }

  get currentSelectedBend(): BendState | null {
    if (!this.selectedNote) {
      return null;
    }
    return getBendState(this.selectedNote);
  }
}

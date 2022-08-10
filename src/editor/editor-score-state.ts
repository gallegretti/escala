import {
  AccentuationType,
  Beat,
  Chord,
  Duration,
  DynamicValue,
  HarmonicType,
  Note,
  PickStroke,
  SlideInType,
  SlideOutType,
  VibratoType,
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

  get isCurrentSelectedNoteStaccato(): boolean {
    return this.selectedNote?.isStaccato ?? false;
  }

  get isCurrentSelectedNoteLetRing(): boolean {
    return this.selectedNote?.isLetRing ?? false;
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

  get vibrato(): VibratoType | null {
    return this.selectedNote?.vibrato ?? null;
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
    return this.selectedBeat?.chord ?? null;
  }

  get currentSelectedNoteDead(): boolean | null {
    return this.selectedNote?.isDead ?? null;
  }

  get currentSelectedNoteHammerOrPull(): boolean | null {
    return this.selectedNote?.isHammerPullOrigin ?? null;
  }

  get currentSelectedNoteSlide(): boolean | null {
    return this.selectedNote?.slideTarget !== null;
  }

  get currentSlideIn(): SlideInType | null {
    return this.selectedNote?.slideInType ?? null;
  }

  get currentSlideOut(): SlideOutType | null {
    return this.selectedNote?.slideOutType ?? null;
  }

  get currentSelectedBend(): BendState | null {
    if (!this.selectedNote) {
      return null;
    }
    return getBendState(this.selectedNote);
  }
}

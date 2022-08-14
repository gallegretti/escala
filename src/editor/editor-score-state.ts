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

  get selectionIsOpenRepeat(): boolean {
    return this.selectedBeat?.voice.bar.masterBar.isRepeatStart ?? false;
  }

  get selectionNumberOfRepetitions(): number {
    return this.selectedBeat?.voice.bar.masterBar.repeatCount ?? 0;
  }

  get selectionFret(): number | null {
    return this.selectedNote?.fret ?? null;
  }

  get selectionText(): string | null {
    return this.selectedBeat?.text ?? null;
  }

  get selectionIsPalmMute(): boolean {
    return this.selectedNote?.isPalmMute ?? false;
  }

  get selectionIsStaccato(): boolean {
    return this.selectedNote?.isStaccato ?? false;
  }

  get selectionIsLetRing(): boolean {
    return this.selectedNote?.isLetRing ?? false;
  }

  get selectionIsTie(): boolean {
    return this.selectedNote?.isTieOrigin ?? false;
  }

  get selectionIsLeftHandTap(): boolean {
    return this.selectedNote?.isLeftHandTapped ?? false;
  }

  get selectionIsVibrato(): boolean {
    return this.selectedNote?.vibrato !== 0 ?? false;
  }

  get selectionVibrato(): VibratoType | null {
    return this.selectedNote?.vibrato ?? null;
  }

  get selectionBeatDuration(): Duration | null {
    return this.selectedBeat?.duration ?? null;
  }

  get selectionBeatDynamics(): DynamicValue | null {
    return this.selectedBeat?.dynamics ?? null;
  }

  get selectionBeatPickStroke(): PickStroke | null {
    return this.selectedBeat?.pickStroke ?? null;
  }

  get selectionNoteIsGhost(): boolean | null {
    return this.selectedNote?.isGhost ?? null;
  }

  get selectionNoteAccentuation(): AccentuationType | null {
    return this.selectedNote?.accentuated ?? null;
  }

  get selectionNoteHarmonicType(): HarmonicType | null {
    return this.selectedNote?.harmonicType ?? null;
  }

  get selectionChord(): Chord | null {
    return this.selectedBeat?.chord ?? null;
  }

  get selectionNoteDead(): boolean | null {
    return this.selectedNote?.isDead ?? null;
  }

  get selectionNoteHammerOrPull(): boolean | null {
    return this.selectedNote?.isHammerPullOrigin ?? null;
  }

  get selectionNoteSlide(): boolean | null {
    return this.selectedNote?.slideTarget !== null;
  }

  get selectionSlideIn(): SlideInType | null {
    return this.selectedNote?.slideInType ?? null;
  }

  get selectionSlideOut(): SlideOutType | null {
    return this.selectedNote?.slideOutType ?? null;
  }

  get selectiondBend(): BendState | null {
    if (!this.selectedNote) {
      return null;
    }
    return getBendState(this.selectedNote);
  }
}

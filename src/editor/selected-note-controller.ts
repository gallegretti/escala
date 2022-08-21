import {
  Beat,
  Bounds,
  Note,
  NoteBounds,
  ScoreRenderer,
} from '../alphatab-types/alphatab-types';

interface NoteSlotData {
    string: number,
    beat: Beat,
    note?: Note // Can be null if there's no note at the selected slot
}

class SelectedNoteController {
  private numberOfStrings = 6;

  constructor(private currentSelectedSlot: NoteSlotData | null) {
  }

  public setNumberOfStrings(numberOfStrings: number) {
    this.numberOfStrings = numberOfStrings;
  }

  public toggleNoteSelection(note: Note) {
    if (this.currentSelectedSlot?.note?.id === note.id) {
      this.currentSelectedSlot = null;
    } else {
      this.currentSelectedSlot = {
        note,
        beat: note.beat,
        string: note.string,
      };
    }
  }

  public movePreviousBeat() {
    return this.moveSelectedNoteHorizontal((beat) => beat.previousBeat);
  }

  public moveNextBeat(): boolean {
    return this.moveSelectedNoteHorizontal((beat) => beat.nextBeat);
  }

  public moveNextBar(): boolean {
    return this.moveSelectedNoteHorizontal((beat) => beat.voice.bar.nextBar?.voices[0].beats[0] ?? null);
  }

  public movePreviousBar(): boolean {
    return this.moveSelectedNoteHorizontal((beat) => beat.voice.bar.previousBar?.voices[0].beats[0] ?? null);
  }

  public moveStartOfCurrentBar(): boolean {
    return this.moveSelectedNoteHorizontal((beat) => beat.voice.beats[0] ?? null);
  }

  public moveSelectedNoteUp() {
    return this.moveSelectedNoteVertical((beatNotes) => {
      if (this.currentSelectedSlot && this.currentSelectedSlot.string < this.numberOfStrings) {
        const nextString = this.currentSelectedSlot.string + 1;
        const nextNote = beatNotes.find((note) => note.string === nextString);
        return {
          string: nextString,
          beat: this.currentSelectedSlot.beat,
          note: nextNote,
        };
      }
      return undefined;
    });
  }

  public moveSelectedNoteDown() {
    return this.moveSelectedNoteVertical((beatNotes) => {
      if (this.currentSelectedSlot && this.currentSelectedSlot.string > 1) {
        const nextString = this.currentSelectedSlot.string - 1;
        const nextNote = beatNotes.find((note) => note.string === nextString);
        return {
          string: nextString,
          beat: this.currentSelectedSlot.beat,
          note: nextNote,
        };
      }
      return undefined;
    });
  }

  public hasSelectedSlot(): boolean {
    return this.currentSelectedSlot !== null;
  }

  public getSelectedNote(): Note | null {
    return this.currentSelectedSlot?.note ?? null;
  }

  public getSelectedSlot(): NoteSlotData | null {
    return this.currentSelectedSlot;
  }

  public setSelectedSlot(noteSlot: NoteSlotData | null) {
    this.currentSelectedSlot = noteSlot;
  }

  public getNoteBounds(renderer: ScoreRenderer): Bounds | undefined {
    if (this.currentSelectedSlot?.note) {
      const beats = renderer?.boundsLookup?.findBeats(this.currentSelectedSlot.note.beat);
      // [0] is the top staff and [1] is at the bottom
      const noteBounds = beats?.[1]?.notes?.find((it: NoteBounds) => it.note.id === this.currentSelectedSlot?.note?.id);
      const bounds = noteBounds?.noteHeadBounds;
      return bounds;
    }
    if (this.currentSelectedSlot) {
      // Same here, use [1] because we only support clicking at the bottom staff
      const barVisualBounds = renderer?.boundsLookup?.findBeats(this.currentSelectedSlot.beat)?.[1]?.visualBounds;
      if (!barVisualBounds) {
        return undefined;
      }
      return {
        x: barVisualBounds.x + (barVisualBounds.w / 2) - this.numberOfStrings - 1,
        w: 7,
        y: barVisualBounds.y + (barVisualBounds.h / (this.numberOfStrings - 1)) * (this.numberOfStrings - this.currentSelectedSlot.string) - this.numberOfStrings - 1,
        h: 10,
      };
    }
    return undefined;
  }

  public updateCurrentSelection(): void {
    if (!this.currentSelectedSlot) {
      return;
    }
    if (!this.currentSelectedSlot.note) {
      const noteAtSlot = this.currentSelectedSlot.beat.notes
        .find((note: Note) => note.string === this.currentSelectedSlot?.string);
      if (noteAtSlot) {
        this.currentSelectedSlot.note = noteAtSlot;
      }
    }
  }

  private moveSelectedNoteVertical(getNote: (notes: Note[]) => NoteSlotData | undefined) {
    if (!this.currentSelectedSlot) {
      return;
    }
    const beatNotes = this.currentSelectedSlot.beat.notes;
    const nextNote = getNote(beatNotes);
    if (!nextNote) {
      return;
    }
    this.setSelectedSlot(nextNote);
  }

  private moveSelectedNoteHorizontal(getBeat: (beat: Beat) => Beat | null): boolean {
    if (!this.currentSelectedSlot) {
      return false;
    }
    const nextBeat = getBeat(this.currentSelectedSlot.beat);
    if (!nextBeat) {
      return false;
    }
    const nextNote = nextBeat.notes.find((note: Note) => note.string === this.currentSelectedSlot?.string);
    this.setSelectedSlot({
      beat: nextBeat,
      string: this.currentSelectedSlot.string,
      note: nextNote,
    });
    return true;
  }
}

export default SelectedNoteController;

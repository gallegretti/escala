import { Beat, Chord } from '../../../alphatab-types/alphatab-types';
import { EditorActionResult, EditorActionSetChord } from '../../editor-action-event';
import EditorActionWithUndo from '../editor-action-with-undo';

class SetChordAction extends EditorActionWithUndo<EditorActionSetChord> {
  do(action: EditorActionSetChord): EditorActionResult {
    const { beat, value: chord } = action.data;
    action.data.previousValue = beat.chord;
    if (chord) {
      return this.addChord(chord, beat);
    }
    return this.removeChord(beat);
  }

  addChord(chord: Chord, beat: Beat): EditorActionResult {
    const chordId = chord.name;
    beat.voice.bar.staff.addChord(chordId, chord);
    beat.chordId = chordId;
    // If there's nothing on the current beat, create the notes. Otherwise don't modify them.
    if (beat.notes.length === 0) {
      chord.strings.forEach((fret, string) => {
        // -1 means the string should not be played
        if (fret !== -1) {
          const note = new alphaTab.model.Note();
          note.string = chord.strings.length - string;
          note.fret = fret;
          beat.addNote(note);
        }
      });
      beat.finish(null as any, new Map<string, unknown>());
      return {
        requiresRerender: true,
        requiresMidiUpdate: true,
      };
    }
    return {
      requiresRerender: true,
      requiresMidiUpdate: false,
    };
  }

  removeChord(beat: Beat): EditorActionResult {
    beat.chordId = null;
    beat.finish(null as any, new Map<string, unknown>());
    return {
      requiresRerender: true,
      requiresMidiUpdate: false,
    };
  }
}

export default new SetChordAction();

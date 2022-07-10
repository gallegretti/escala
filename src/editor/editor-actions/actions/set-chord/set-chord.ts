import { EditorActionResult, EditorActionSetChord } from '../../editor-action-event';
import EditorActionInterface from '../editor-action.interface';

class SetChordAction extends EditorActionInterface<EditorActionSetChord> {
  do(action: EditorActionSetChord): EditorActionResult {
    const { beat, chord } = action.data;
    // If there's nothing on the current beat, create the notes. Otherwise don't modify them.
    if (chord) {
      const chordId = '123456';
      beat.voice.bar.staff.addChord(chordId, chord);
      beat.chordId = chordId;
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
      }
    }
    return {
      requiresRerender: true,
      requiresMidiUpdate: true,
    };
  }

  undo(action: EditorActionSetChord): EditorActionResult {
    return {
      requiresRerender: true,
      requiresMidiUpdate: true,
    };
  }
}

export default new SetChordAction();

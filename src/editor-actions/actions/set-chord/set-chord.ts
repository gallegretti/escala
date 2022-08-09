import { EditorActionResult, EditorActionSetChord } from '../../editor-action-event';
import EditorActionWithUndo from '../editor-action-with-undo';

class SetChordAction extends EditorActionWithUndo<EditorActionSetChord> {
  do(action: EditorActionSetChord): EditorActionResult {
    const { beat, value: chord } = action.data;
    // If there's nothing on the current beat, create the notes. Otherwise don't modify them.
    action.data.previousValue = beat.chord;
    if (chord) {
      const chordId = chord.name;
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
    } else {
      // TODO: If the notes were added by the action, the undo should remove them
      beat.chordId = null;
      beat.finish(null as any, new Map<string, unknown>());
    }
    return {
      requiresRerender: true,
      requiresMidiUpdate: true,
    };
  }
}

export default new SetChordAction();

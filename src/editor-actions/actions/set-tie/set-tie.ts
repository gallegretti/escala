import { EditorActionResult, EditorActionSetTie } from '../../editor-action-event';
import EditorActionWithUndo from '../editor-action-with-undo';

class SetTieAction extends EditorActionWithUndo<EditorActionSetTie> {
  do(action: EditorActionSetTie): EditorActionResult {
    const { note, value: tie } = action.data;
    const nextNote = alphaTab.model.Note.nextNoteOnSameLine(note);
    if (!nextNote) {
      return {
        requiresMidiUpdate: false,
        requiresRerender: false,
      };
    }
    action.data.previousValue = note.isTieOrigin;
    if (tie) {
      note.tieDestination = nextNote;
      nextNote.tieOrigin = note;
      nextNote.isTieDestination = true;
    } else if (note.tieDestination) {
      note.tieDestination.tieOrigin = null;
      note.tieDestination.isTieDestination = false;
      note.tieDestination = null;
    }
    return {
      requiresRerender: true,
      requiresMidiUpdate: true,
    };
  }
}

export default new SetTieAction();

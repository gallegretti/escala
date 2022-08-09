import { EditorActionResult, EditorActionSetDeadNote } from '../../editor-action-event';
import EditorActionWithUndo from '../editor-action-with-undo';

class SetDeadNoteAction extends EditorActionWithUndo<EditorActionSetDeadNote> {
  do(action: EditorActionSetDeadNote): EditorActionResult {
    const { note, value: isDeadNote } = action.data;
    action.data.previousValue = note.isDead;
    note.isDead = isDeadNote;
    return {
      requiresRerender: true,
      requiresMidiUpdate: true,
    };
  }
}

export default new SetDeadNoteAction();

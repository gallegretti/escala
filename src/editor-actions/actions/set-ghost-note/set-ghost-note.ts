import { EditorActionResult, EditorActionSetGhostNote } from '../../editor-action-event';
import EditorActionWithUndo from '../editor-action-with-undo';

class SetGhostNoteAction extends EditorActionWithUndo<EditorActionSetGhostNote> {
  do(action: EditorActionSetGhostNote): EditorActionResult {
    const { note, value: isGhost } = action.data;
    action.data.previousValue = note.isGhost;
    note.isGhost = isGhost;
    return {
      requiresRerender: true,
      requiresMidiUpdate: true,
    };
  }
}

export default new SetGhostNoteAction();

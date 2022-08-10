import { EditorActionResult, EditorActionSetStaccato } from '../../editor-action-event';
import EditorActionWithUndo from '../editor-action-with-undo';

class SetStaccatoAction extends EditorActionWithUndo<EditorActionSetStaccato> {
  do(action: EditorActionSetStaccato): EditorActionResult {
    const { note, value } = action.data;
    action.data.previousValue = note.isStaccato;
    note.isStaccato = value;
    return {
      requiresRerender: true,
      requiresMidiUpdate: true,
    };
  }
}

export default new SetStaccatoAction();

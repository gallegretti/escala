import { EditorActionResult, EditorActionSetSlideIn } from '../../editor-action-event';
import EditorActionWithUndo from '../editor-action-with-undo';

class SetSlideInAction extends EditorActionWithUndo<EditorActionSetSlideIn> {
  do(action: EditorActionSetSlideIn): EditorActionResult {
    const { note } = action.data;
    action.data.previousValue = note.slideInType;
    note.slideInType = action.data.value;
    return {
      requiresRerender: true,
      requiresMidiUpdate: true,
    };
  }
}

export default new SetSlideInAction();

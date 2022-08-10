import { EditorActionResult, EditorActionSetSlideOut } from '../../editor-action-event';
import EditorActionWithUndo from '../editor-action-with-undo';

class SetSlideOutAction extends EditorActionWithUndo<EditorActionSetSlideOut> {
  do(action: EditorActionSetSlideOut): EditorActionResult {
    const { note } = action.data;
    action.data.previousValue = note.slideOutType;
    note.slideOutType = action.data.value;
    return {
      requiresRerender: true,
      requiresMidiUpdate: true,
    };
  }
}

export default new SetSlideOutAction();

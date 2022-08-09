import { EditorActionResult, EditorActionSetTap } from '../../editor-action-event';
import EditorActionWithUndo from '../editor-action-with-undo';

class SetTapAction extends EditorActionWithUndo<EditorActionSetTap> {
  do(action: EditorActionSetTap): EditorActionResult {
    const { note, value: isLeftHandTap } = action.data;
    action.data.previousValue = note.isLeftHandTapped;
    note.isLeftHandTapped = isLeftHandTap;
    return {
      requiresRerender: true,
      requiresMidiUpdate: true,
    };
  }
}

export default new SetTapAction();

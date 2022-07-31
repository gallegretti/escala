import { EditorActionResult, EditorActionSetTap } from '../../editor-action-event';
import EditorActionInterface from '../editor-action.interface';

class SetTapAction extends EditorActionInterface<EditorActionSetTap> {
  do(action: EditorActionSetTap): EditorActionResult {
    const { note, isLeftHandTap } = action.data;
    note.isLeftHandTapped = isLeftHandTap;
    return {
      requiresRerender: true,
      requiresMidiUpdate: true,
    };
  }

  undo(action: EditorActionSetTap): EditorActionResult {
    const { note, previousIsLeftHalpTap } = action.data;
    note.isLeftHandTapped = previousIsLeftHalpTap!;
    return {
      requiresRerender: true,
      requiresMidiUpdate: true,
    };
  }
}

export default new SetTapAction();

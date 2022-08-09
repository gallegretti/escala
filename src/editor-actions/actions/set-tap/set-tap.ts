import { EditorActionResult, EditorActionSetTap } from '../../editor-action-event';
import EditorActionInterface from '../editor-action.interface';

class SetTapAction extends EditorActionInterface<EditorActionSetTap> {
  do(action: EditorActionSetTap): EditorActionResult {
    const { note, isLeftHandTap } = action.data;
    action.data.previousIsLeftHalpTap = note.isLeftHandTapped;
    note.isLeftHandTapped = isLeftHandTap;
    return {
      requiresRerender: true,
      requiresMidiUpdate: true,
    };
  }

  undo(action: EditorActionSetTap): EditorActionResult {
    const { note, previousIsLeftHalpTap } = action.data;
    if (previousIsLeftHalpTap === undefined) {
      return {
        requiresMidiUpdate: false,
        requiresRerender: false,
      };
    }
    return this.do({
      type: action.type,
      data: {
        isLeftHandTap: previousIsLeftHalpTap,
        note,
      },
    });
  }
}

export default new SetTapAction();

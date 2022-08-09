import { EditorActionResult, EditorActionSetTap } from '../../editor-action-event';
import EditorActionInterface from '../editor-action.interface';

class SetTapAction extends EditorActionInterface<EditorActionSetTap> {
  do(action: EditorActionSetTap): EditorActionResult {
    const { note, value: isLeftHandTap } = action.data;
    action.data.previousValue = note.isLeftHandTapped;
    note.isLeftHandTapped = isLeftHandTap;
    return {
      requiresRerender: true,
      requiresMidiUpdate: true,
    };
  }

  undo(action: EditorActionSetTap): EditorActionResult {
    const { note, previousValue } = action.data;
    if (previousValue === undefined) {
      return {
        requiresMidiUpdate: false,
        requiresRerender: false,
      };
    }
    return this.do({
      type: action.type,
      data: {
        value: previousValue,
        note,
      },
    });
  }
}

export default new SetTapAction();

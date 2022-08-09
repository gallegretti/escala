import { EditorActionResult, EditorActionSetText } from '../../editor-action-event';
import EditorActionInterface from '../editor-action.interface';

class SetFretAction extends EditorActionInterface<EditorActionSetText> {
  do(action: EditorActionSetText): EditorActionResult {
    const didChange = action.data.beat.text !== action.data.value;
    // Store previous text so we can use it on the undo
    action.data.previousValue = action.data.beat.text ?? '';
    action.data.beat.text = action.data.value === '' ? null : action.data.value;
    return {
      requiresRerender: didChange,
      requiresMidiUpdate: false,
    };
  }

  undo(action: EditorActionSetText): EditorActionResult {
    const { previousValue, beat } = action.data;
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
        beat,
      },
    });
  }
}

export default new SetFretAction();

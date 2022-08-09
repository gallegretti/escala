import { EditorActionResult, EditorActionSetText } from '../../editor-action-event';
import EditorActionInterface from '../editor-action.interface';

class SetFretAction extends EditorActionInterface<EditorActionSetText> {
  do(action: EditorActionSetText): EditorActionResult {
    const didChange = action.data.beat.text !== action.data.text;
    // Store previous text so we can use it on the undo
    action.data.previousText = action.data.beat.text ?? '';
    action.data.beat.text = action.data.text === '' ? null : action.data.text;
    return {
      requiresRerender: didChange,
      requiresMidiUpdate: false,
    };
  }

  undo(action: EditorActionSetText): EditorActionResult {
    const { previousText, beat } = action.data;
    if (previousText === undefined) {
      return {
        requiresMidiUpdate: false,
        requiresRerender: false,
      };
    }
    return this.do({
      type: action.type,
      data: {
        text: previousText,
        beat,
      },
    });
  }
}

export default new SetFretAction();

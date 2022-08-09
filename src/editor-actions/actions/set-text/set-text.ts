import { EditorActionResult, EditorActionSetText } from '../../editor-action-event';
import EditorActionWithUndo from '../editor-action-with-undo';

class SetFretAction extends EditorActionWithUndo<EditorActionSetText> {
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
}

export default new SetFretAction();

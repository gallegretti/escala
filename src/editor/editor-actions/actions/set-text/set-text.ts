import { EditorActionResult, EditorActionSetText } from '../../editor-action-event';
import EditorActionInterface from '../editor-action.interface';

class SetFretAction extends EditorActionInterface<EditorActionSetText> {
  do(action: EditorActionSetText): EditorActionResult {
    const didChange = action.data.beat.text !== action.data.text;
    // Store previous text so we can use it on the undo
    action.data.previousText = action.data.beat.text ?? undefined;
    action.data.beat.text = action.data.text;
    return {
      requiresRerender: didChange,
      requiresMidiUpdate: false,
    };
  }

  undo(action: EditorActionSetText): EditorActionResult {
    action.data.beat.text = action.data.previousText ?? null;
    return {
      requiresRerender: true,
      requiresMidiUpdate: false,
    };
  }
}

export default new SetFretAction();

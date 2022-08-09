import { EditorActionResult, EditorActionSetPickStroke } from '../../editor-action-event';
import EditorActionWithUndo from '../editor-action-with-undo';

class SetPickStrokeAction extends EditorActionWithUndo<EditorActionSetPickStroke> {
  do(action: EditorActionSetPickStroke): EditorActionResult {
    const { beat, value: pickStroke } = action.data;
    action.data.previousValue = beat.pickStroke;
    beat.pickStroke = pickStroke;
    return {
      requiresRerender: true,
      requiresMidiUpdate: true,
    };
  }
}

export default new SetPickStrokeAction();

import { EditorActionResult, EditorActionSetPickStroke } from '../../editor-action-event';
import EditorActionInterface from '../editor-action.interface';

class SetPickStrokeAction extends EditorActionInterface<EditorActionSetPickStroke> {
  do(action: EditorActionSetPickStroke): EditorActionResult {
    const { beat, value: pickStroke } = action.data;
    action.data.previousValue = beat.pickStroke;
    beat.pickStroke = pickStroke;
    return {
      requiresRerender: true,
      requiresMidiUpdate: true,
    };
  }

  undo(action: EditorActionSetPickStroke): EditorActionResult {
    const { beat, previousValue } = action.data;
    if (previousValue === undefined) {
      return {
        requiresMidiUpdate: false,
        requiresRerender: false,
      };
    }
    return this.do({
      type: action.type,
      data: {
        beat,
        value: previousValue,
      },
    });
  }
}

export default new SetPickStrokeAction();

import { EditorActionResult, EditorActionSetPickStroke } from '../../editor-action-event';
import EditorActionInterface from '../editor-action.interface';

class SetPickStrokeAction extends EditorActionInterface<EditorActionSetPickStroke> {
  do(action: EditorActionSetPickStroke): EditorActionResult {
    const { beat, pickStroke } = action.data;
    action.data.previousPickStroke = beat.pickStroke;
    beat.pickStroke = pickStroke;
    return {
      requiresRerender: true,
      requiresMidiUpdate: true,
    };
  }

  undo(action: EditorActionSetPickStroke): EditorActionResult {
    const { beat, previousPickStroke } = action.data;
    if (previousPickStroke === undefined) {
      return {
        requiresMidiUpdate: false,
        requiresRerender: false,
      };
    }
    return this.do({
      type: action.type,
      data: {
        beat,
        pickStroke: previousPickStroke,
      },
    });
  }
}

export default new SetPickStrokeAction();

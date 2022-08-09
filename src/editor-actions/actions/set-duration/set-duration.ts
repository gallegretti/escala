import { EditorActionResult, EditorActionSetDuration } from '../../editor-action-event';
import EditorActionInterface from '../editor-action.interface';

class SetDurationAction extends EditorActionInterface<EditorActionSetDuration> {
  do(action: EditorActionSetDuration): EditorActionResult {
    const didChange = action.data.value !== action.data.beat.duration;
    // Store previous data so we can use it on the undo
    action.data.previousValue = action.data.beat.duration;
    action.data.beat.duration = action.data.value;
    return {
      requiresRerender: didChange,
      requiresMidiUpdate: didChange,
    };
  }

  undo(action: EditorActionSetDuration): EditorActionResult {
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

export default new SetDurationAction();

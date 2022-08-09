import { EditorActionResult, EditorActionSetDuration } from '../../editor-action-event';
import EditorActionInterface from '../editor-action.interface';

class SetDurationAction extends EditorActionInterface<EditorActionSetDuration> {
  do(action: EditorActionSetDuration): EditorActionResult {
    const didChange = action.data.duration !== action.data.beat.duration;
    // Store previous data so we can use it on the undo
    action.data.previousDuration = action.data.beat.duration;
    action.data.beat.duration = action.data.duration;
    return {
      requiresRerender: didChange,
      requiresMidiUpdate: didChange,
    };
  }

  undo(action: EditorActionSetDuration): EditorActionResult {
    const { previousDuration, beat } = action.data;
    if (previousDuration === undefined) {
      return {
        requiresMidiUpdate: false,
        requiresRerender: false,
      };
    }
    return this.do({
      type: action.type,
      data: {
        duration: previousDuration,
        beat,
      },
    });
  }
}

export default new SetDurationAction();

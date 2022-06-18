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
    action.data.beat.duration = action.data.previousDuration!;
    return {
      requiresRerender: true,
      requiresMidiUpdate: true,
    };
  }
}

export default new SetDurationAction();

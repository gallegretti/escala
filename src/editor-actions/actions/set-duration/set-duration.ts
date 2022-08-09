import { EditorActionResult, EditorActionSetDuration } from '../../editor-action-event';
import EditorActionWithUndo from '../editor-action-with-undo';

class SetDurationAction extends EditorActionWithUndo<EditorActionSetDuration> {
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
}

export default new SetDurationAction();

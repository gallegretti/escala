import { EditorActionResult, EditorActionSetDynamics } from '../../editor-action-event';
import EditorActionWithUndo from '../editor-action-with-undo';

class SetDynamicAction extends EditorActionWithUndo<EditorActionSetDynamics> {
  do(action: EditorActionSetDynamics): EditorActionResult {
    const didChange = action.data.value !== action.data.beat.dynamics;
    // Store previous data so we can use it on the undo
    action.data.previousValue = action.data.beat.dynamics;
    action.data.beat.dynamics = action.data.value;
    return {
      requiresRerender: didChange,
      requiresMidiUpdate: didChange,
    };
  }
}

export default new SetDynamicAction();

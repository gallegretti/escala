import { EditorActionResult, EditorActionSetDynamics } from '../../editor-action-event';
import EditorActionInterface from '../editor-action.interface';

class SetDynamicAction extends EditorActionInterface<EditorActionSetDynamics> {
  do(action: EditorActionSetDynamics): EditorActionResult {
    const didChange = action.data.dynamics !== action.data.beat.dynamics;
    // Store previous data so we can use it on the undo
    action.data.previousDynamics = action.data.beat.dynamics;
    action.data.beat.dynamics = action.data.dynamics;
    return {
      requiresRerender: didChange,
      requiresMidiUpdate: didChange,
    };
  }

  undo(action: EditorActionSetDynamics): EditorActionResult {
    action.data.beat.dynamics = action.data.dynamics!;
    return {
      requiresRerender: true,
      requiresMidiUpdate: true,
    };
  }
}

export default new SetDynamicAction();

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
    const { previousDynamics, beat } = action.data;
    if (previousDynamics === undefined) {
      return {
        requiresMidiUpdate: false,
        requiresRerender: false,
      };
    }
    return this.do({
      type: action.type,
      data: {
        dynamics: previousDynamics,
        beat,
      },
    });
  }
}

export default new SetDynamicAction();

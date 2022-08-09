import { EditorActionResult, EditorActionSetDynamics } from '../../editor-action-event';
import EditorActionInterface from '../editor-action.interface';

class SetDynamicAction extends EditorActionInterface<EditorActionSetDynamics> {
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

  undo(action: EditorActionSetDynamics): EditorActionResult {
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

export default new SetDynamicAction();

import { EditorActionResult, EditorActionSetHarmonic } from '../../editor-action-event';
import EditorActionInterface from '../editor-action.interface';

class SetHarmonicAction extends EditorActionInterface<EditorActionSetHarmonic> {
  do(action: EditorActionSetHarmonic): EditorActionResult {
    const { note, value: harmonicType } = action.data;
    action.data.previousValue = note.harmonicValue;
    note.harmonicType = harmonicType;
    return {
      requiresRerender: true,
      requiresMidiUpdate: true,
    };
  }

  undo(action: EditorActionSetHarmonic): EditorActionResult {
    const { note, previousValue } = action.data;
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
        note,
      },
    });
  }
}

export default new SetHarmonicAction();

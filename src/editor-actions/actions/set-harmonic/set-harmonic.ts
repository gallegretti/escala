import { EditorActionResult, EditorActionSetHarmonic } from '../../editor-action-event';
import EditorActionInterface from '../editor-action.interface';

class SetHarmonicAction extends EditorActionInterface<EditorActionSetHarmonic> {
  do(action: EditorActionSetHarmonic): EditorActionResult {
    const { note, harmonic } = action.data;
    action.data.previousHarmonic = note.harmonicValue;
    note.harmonicType = harmonic;
    return {
      requiresRerender: true,
      requiresMidiUpdate: true,
    };
  }

  undo(action: EditorActionSetHarmonic): EditorActionResult {
    const { note, previousHarmonic } = action.data;
    if (previousHarmonic === undefined) {
      return {
        requiresMidiUpdate: false,
        requiresRerender: false,
      };
    }
    return this.do({
      type: action.type,
      data: {
        harmonic: previousHarmonic,
        note,
      },
    });
  }
}

export default new SetHarmonicAction();

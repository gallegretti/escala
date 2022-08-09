import { EditorActionResult, EditorActionSetHarmonic } from '../../editor-action-event';
import EditorActionWithUndo from '../editor-action-with-undo';

class SetHarmonicAction extends EditorActionWithUndo<EditorActionSetHarmonic> {
  do(action: EditorActionSetHarmonic): EditorActionResult {
    const { note, value: harmonicType } = action.data;
    action.data.previousValue = note.harmonicValue;
    note.harmonicType = harmonicType;
    return {
      requiresRerender: true,
      requiresMidiUpdate: true,
    };
  }
}

export default new SetHarmonicAction();

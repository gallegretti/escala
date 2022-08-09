import { EditorActionResult, EditorActionSetVibrato } from '../../editor-action-event';
import EditorActionWithUndo from '../editor-action-with-undo';

class SetVibratoAction extends EditorActionWithUndo<EditorActionSetVibrato> {
  do(action: EditorActionSetVibrato): EditorActionResult {
    const { note, value: vibrato } = action.data;
    action.data.previousValue = note.vibrato;
    note.vibrato = vibrato;
    return {
      requiresRerender: true,
      requiresMidiUpdate: true,
    };
  }
}

export default new SetVibratoAction();

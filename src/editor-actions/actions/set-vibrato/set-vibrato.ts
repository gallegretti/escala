import { EditorActionResult, EditorActionSetVibrato } from '../../editor-action-event';
import EditorActionInterface from '../editor-action.interface';

class SetVibratoAction extends EditorActionInterface<EditorActionSetVibrato> {
  do(action: EditorActionSetVibrato): EditorActionResult {
    const { note, isVibrato } = action.data;
    note.vibrato = isVibrato ? 1 : 0;
    return {
      requiresRerender: true,
      requiresMidiUpdate: true,
    };
  }

  undo(action: EditorActionSetVibrato): EditorActionResult {
    const { note, previousIsVibrato } = action.data;
    note.vibrato = previousIsVibrato! ? 1 : 0;
    return {
      requiresRerender: true,
      requiresMidiUpdate: true,
    };
  }
}

export default new SetVibratoAction();

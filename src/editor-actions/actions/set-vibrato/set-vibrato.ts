import { EditorActionResult, EditorActionSetVibrato } from '../../editor-action-event';
import EditorActionInterface from '../editor-action.interface';

class SetVibratoAction extends EditorActionInterface<EditorActionSetVibrato> {
  do(action: EditorActionSetVibrato): EditorActionResult {
    const { note, vibrato } = action.data;
    action.data.previousVibrato = note.vibrato;
    note.vibrato = vibrato;
    return {
      requiresRerender: true,
      requiresMidiUpdate: true,
    };
  }

  undo(action: EditorActionSetVibrato): EditorActionResult {
    const { note, previousVibrato } = action.data;
    if (previousVibrato === undefined) {
      return {
        requiresMidiUpdate: false,
        requiresRerender: false,
      };
    }
    return this.do({
      type: action.type,
      data: {
        vibrato: previousVibrato,
        note,
      },
    });
  }
}

export default new SetVibratoAction();

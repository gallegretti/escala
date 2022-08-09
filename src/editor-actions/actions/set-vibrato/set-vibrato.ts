import { EditorActionResult, EditorActionSetVibrato } from '../../editor-action-event';
import EditorActionInterface from '../editor-action.interface';

class SetVibratoAction extends EditorActionInterface<EditorActionSetVibrato> {
  do(action: EditorActionSetVibrato): EditorActionResult {
    const { note, value: vibrato } = action.data;
    action.data.previousValue = note.vibrato;
    note.vibrato = vibrato;
    return {
      requiresRerender: true,
      requiresMidiUpdate: true,
    };
  }

  undo(action: EditorActionSetVibrato): EditorActionResult {
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

export default new SetVibratoAction();

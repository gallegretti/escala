import { EditorActionResult, EditorActionSetPalmMute } from '../../editor-action-event';
import EditorActionInterface from '../editor-action.interface';

class SetPalmMuteAction extends EditorActionInterface<EditorActionSetPalmMute> {
  do(action: EditorActionSetPalmMute): EditorActionResult {
    const { note, value: isPalmMute } = action.data;
    action.data.previousValue = note.isPalmMute;
    note.isPalmMute = isPalmMute;
    return {
      requiresRerender: true,
      requiresMidiUpdate: true,
    };
  }

  undo(action: EditorActionSetPalmMute): EditorActionResult {
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

export default new SetPalmMuteAction();

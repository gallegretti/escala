import { EditorActionResult, EditorActionSetPalmMute } from '../../editor-action-event';
import EditorActionInterface from '../editor-action.interface';

class SetPalmMuteAction extends EditorActionInterface<EditorActionSetPalmMute> {
  do(action: EditorActionSetPalmMute): EditorActionResult {
    const { note, isPalmMute } = action.data;
    action.data.previousPalmMute = note.isPalmMute;
    note.isPalmMute = isPalmMute;
    return {
      requiresRerender: true,
      requiresMidiUpdate: true,
    };
  }

  undo(action: EditorActionSetPalmMute): EditorActionResult {
    const { note, previousPalmMute } = action.data;
    if (previousPalmMute === undefined) {
      return {
        requiresMidiUpdate: false,
        requiresRerender: false,
      };
    }
    return this.do({
      type: action.type,
      data: {
        isPalmMute: previousPalmMute,
        note,
      },
    });
  }
}

export default new SetPalmMuteAction();

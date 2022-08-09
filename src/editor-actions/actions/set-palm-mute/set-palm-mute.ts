import { EditorActionResult, EditorActionSetPalmMute } from '../../editor-action-event';
import EditorActionWithUndo from '../editor-action-with-undo';

class SetPalmMuteAction extends EditorActionWithUndo<EditorActionSetPalmMute> {
  do(action: EditorActionSetPalmMute): EditorActionResult {
    const { note, value: isPalmMute } = action.data;
    action.data.previousValue = note.isPalmMute;
    note.isPalmMute = isPalmMute;
    return {
      requiresRerender: true,
      requiresMidiUpdate: true,
    };
  }
}

export default new SetPalmMuteAction();

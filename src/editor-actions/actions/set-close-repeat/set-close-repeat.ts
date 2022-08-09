import { EditorActionResult, EditorActionSetCloseRepeat } from '../../editor-action-event';
import EditorActionWithUndo from '../editor-action-with-undo';

class SetCloseRepeatAction extends EditorActionWithUndo<EditorActionSetCloseRepeat> {
  do(action: EditorActionSetCloseRepeat): EditorActionResult {
    const { masterBar } = action.data.beat.voice.bar;
    action.data.previousValue = masterBar.repeatCount;
    masterBar.repeatCount = action.data.value;
    masterBar.score.rebuildRepeatGroups();
    return {
      requiresRerender: true,
      requiresMidiUpdate: true,
    };
  }
}

export default new SetCloseRepeatAction();

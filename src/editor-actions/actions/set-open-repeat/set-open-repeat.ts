import { EditorActionResult, EditorActionSetOpenRepeat } from '../../editor-action-event';
import EditorActionWithUndo from '../editor-action-with-undo';

class SetOpenRepeatAction extends EditorActionWithUndo<EditorActionSetOpenRepeat> {
  do(action: EditorActionSetOpenRepeat): EditorActionResult {
    const { masterBar } = action.data.beat.voice.bar;
    action.data.previousValue = masterBar.isRepeatStart;
    masterBar.isRepeatStart = action.data.value;
    masterBar.score.rebuildRepeatGroups();
    return {
      requiresRerender: true,
      requiresMidiUpdate: true,
    };
  }
}

export default new SetOpenRepeatAction();

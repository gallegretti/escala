import { EditorActionResult, EditorActionSetOpenRepeat } from '../../editor-action-event';
import EditorActionInterface from '../editor-action.interface';

class SetOpenRepeatAction extends EditorActionInterface<EditorActionSetOpenRepeat> {
  do(action: EditorActionSetOpenRepeat): EditorActionResult {
    const { masterBar } = action.data.beat.voice.bar;
    action.data.previousOpenRepeat = masterBar.isRepeatStart;
    masterBar.isRepeatStart = action.data.openRepeat;
    masterBar.score.rebuildRepeatGroups();
    return {
      requiresRerender: true,
      requiresMidiUpdate: true,
    };
  }

  undo(action: EditorActionSetOpenRepeat): EditorActionResult {
    const { previousOpenRepeat, beat } = action.data;
    if (previousOpenRepeat === undefined) {
      return {
        requiresMidiUpdate: false,
        requiresRerender: false,
      };
    }
    return this.do({
      type: action.type,
      data: {
        beat,
        openRepeat: previousOpenRepeat,
      },
    });
  }
}

export default new SetOpenRepeatAction();

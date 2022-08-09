import { EditorActionResult, EditorActionSetOpenRepeat } from '../../editor-action-event';
import EditorActionInterface from '../editor-action.interface';

class SetOpenRepeatAction extends EditorActionInterface<EditorActionSetOpenRepeat> {
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

  undo(action: EditorActionSetOpenRepeat): EditorActionResult {
    const { previousValue, beat } = action.data;
    if (previousValue === undefined) {
      return {
        requiresMidiUpdate: false,
        requiresRerender: false,
      };
    }
    return this.do({
      type: action.type,
      data: {
        beat,
        value: previousValue,
      },
    });
  }
}

export default new SetOpenRepeatAction();

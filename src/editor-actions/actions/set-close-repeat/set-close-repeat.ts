import { EditorActionResult, EditorActionSetCloseRepeat } from '../../editor-action-event';
import EditorActionInterface from '../editor-action.interface';

class SetCloseRepeatAction extends EditorActionInterface<EditorActionSetCloseRepeat> {
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

  undo(action: EditorActionSetCloseRepeat): EditorActionResult {
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
        value: previousValue,
        beat,
      },
    });
  }
}

export default new SetCloseRepeatAction();

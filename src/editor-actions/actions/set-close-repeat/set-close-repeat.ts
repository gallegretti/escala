import { EditorActionResult, EditorActionSetCloseRepeat } from '../../editor-action-event';
import EditorActionInterface from '../editor-action.interface';

class SetCloseRepeatAction extends EditorActionInterface<EditorActionSetCloseRepeat> {
  do(action: EditorActionSetCloseRepeat): EditorActionResult {
    const { masterBar } = action.data.beat.voice.bar;
    action.data.previousNumberOfRepetitions = masterBar.repeatCount;
    masterBar.repeatCount = action.data.numberOfRepetitions;
    masterBar.score.rebuildRepeatGroups();
    return {
      requiresRerender: true,
      requiresMidiUpdate: true,
    };
  }

  undo(action: EditorActionSetCloseRepeat): EditorActionResult {
    const { previousNumberOfRepetitions, beat } = action.data;
    if (previousNumberOfRepetitions === undefined) {
      return {
        requiresMidiUpdate: false,
        requiresRerender: false,
      };
    }
    return this.do({
      type: action.type,
      data: {
        numberOfRepetitions: previousNumberOfRepetitions,
        beat,
      },
    });
  }
}

export default new SetCloseRepeatAction();

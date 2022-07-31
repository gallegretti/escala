import { EditorActionResult, EditorActionSetCloseRepeat } from '../../editor-action-event';
import EditorActionInterface from '../editor-action.interface';

class SetCloseRepeatAction extends EditorActionInterface<EditorActionSetCloseRepeat> {
  do(action: EditorActionSetCloseRepeat): EditorActionResult {
    const { masterBar } = action.data.beat.voice.bar;
    masterBar.repeatCount = action.data.numberOfRepetitions;
    masterBar.score.rebuildRepeatGroups();
    return {
      requiresRerender: true,
      requiresMidiUpdate: true,
    };
  }

  undo(action: EditorActionSetCloseRepeat): EditorActionResult {
    return {
      requiresMidiUpdate: false,
      requiresRerender: false,
    };
  }
}

export default new SetCloseRepeatAction();

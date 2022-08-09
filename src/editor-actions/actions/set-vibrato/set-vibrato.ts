import { EditorActionResult, EditorActionSetVibrato } from '../../editor-action-event';
import EditorActionInterface from '../editor-action.interface';

class SetVibratoAction extends EditorActionInterface<EditorActionSetVibrato> {
  do(action: EditorActionSetVibrato): EditorActionResult {
    const { note, isVibrato } = action.data;
    action.data.previousIsVibrato = note.vibrato !== alphaTab.model.VibratoType.None;
    note.vibrato = isVibrato ? alphaTab.model.VibratoType.Slight : alphaTab.model.VibratoType.None;
    return {
      requiresRerender: true,
      requiresMidiUpdate: true,
    };
  }

  undo(action: EditorActionSetVibrato): EditorActionResult {
    const { note, previousIsVibrato } = action.data;
    if (previousIsVibrato === undefined) {
      return {
        requiresMidiUpdate: false,
        requiresRerender: false,
      };
    }
    return this.do({
      type: action.type,
      data: {
        isVibrato: previousIsVibrato,
        note,
      },
    });
  }
}

export default new SetVibratoAction();

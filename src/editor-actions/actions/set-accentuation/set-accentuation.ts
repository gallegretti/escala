import { EditorActionResult, EditorActionSetAccentuation } from '../../editor-action-event';
import EditorActionInterface from '../editor-action.interface';

class SetAccentuationAction extends EditorActionInterface<EditorActionSetAccentuation> {
  do(action: EditorActionSetAccentuation): EditorActionResult {
    const { note, value: accentuation } = action.data;
    action.data.previousValue = note.accentuated;
    note.accentuated = accentuation;
    return {
      requiresRerender: true,
      requiresMidiUpdate: true,
    };
  }

  undo(action: EditorActionSetAccentuation): EditorActionResult {
    const { note, previousValue } = action.data;
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
        note,
      },
    });
  }
}

export default new SetAccentuationAction();

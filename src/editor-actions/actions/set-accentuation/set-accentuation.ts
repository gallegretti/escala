import { EditorActionResult, EditorActionSetAccentuation } from '../../editor-action-event';
import EditorActionInterface from '../editor-action.interface';

class SetAccentuationAction extends EditorActionInterface<EditorActionSetAccentuation> {
  do(action: EditorActionSetAccentuation): EditorActionResult {
    const { note, accentuation } = action.data;
    action.data.previousAccentuation = note.accentuated;
    note.accentuated = accentuation;
    return {
      requiresRerender: true,
      requiresMidiUpdate: true,
    };
  }

  undo(action: EditorActionSetAccentuation): EditorActionResult {
    const { note, previousAccentuation } = action.data;
    if (previousAccentuation === undefined) {
      return {
        requiresMidiUpdate: false,
        requiresRerender: false,
      };
    }
    return this.do({
      type: action.type,
      data: {
        accentuation: previousAccentuation,
        note,
      },
    });
  }
}

export default new SetAccentuationAction();

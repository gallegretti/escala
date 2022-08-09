import { EditorActionResult, EditorActionSetAccentuation } from '../../editor-action-event';
import EditorActionWithUndo from '../editor-action-with-undo';

class SetAccentuationAction extends EditorActionWithUndo<EditorActionSetAccentuation> {
  do(action: EditorActionSetAccentuation): EditorActionResult {
    const { note, value: accentuation } = action.data;
    action.data.previousValue = note.accentuated;
    note.accentuated = accentuation;
    return {
      requiresRerender: true,
      requiresMidiUpdate: true,
    };
  }
}

export default new SetAccentuationAction();

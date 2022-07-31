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
    note.accentuated = previousAccentuation!;
    return {
      requiresRerender: true,
      requiresMidiUpdate: true,
    };
  }
}

export default new SetAccentuationAction();

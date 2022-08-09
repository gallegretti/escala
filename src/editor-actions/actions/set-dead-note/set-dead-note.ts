import { EditorActionResult, EditorActionSetDeadNote } from '../../editor-action-event';
import EditorActionInterface from '../editor-action.interface';

class SetDeadNoteAction extends EditorActionInterface<EditorActionSetDeadNote> {
  do(action: EditorActionSetDeadNote): EditorActionResult {
    const { note, value: isDeadNote } = action.data;
    action.data.previousValue = note.isDead;
    note.isDead = isDeadNote;
    return {
      requiresRerender: true,
      requiresMidiUpdate: true,
    };
  }

  undo(action: EditorActionSetDeadNote): EditorActionResult {
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

export default new SetDeadNoteAction();

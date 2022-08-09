import { EditorActionResult, EditorActionSetDeadNote } from '../../editor-action-event';
import EditorActionInterface from '../editor-action.interface';

class SetDeadNoteAction extends EditorActionInterface<EditorActionSetDeadNote> {
  do(action: EditorActionSetDeadNote): EditorActionResult {
    const { note, isDeadNote } = action.data;
    action.data.previousDeadNote = note.isDead;
    note.isDead = isDeadNote;
    return {
      requiresRerender: true,
      requiresMidiUpdate: true,
    };
  }

  undo(action: EditorActionSetDeadNote): EditorActionResult {
    const { note, previousDeadNote } = action.data;
    if (previousDeadNote === undefined) {
      return {
        requiresMidiUpdate: false,
        requiresRerender: false,
      };
    }
    return this.do({
      type: action.type,
      data: {
        isDeadNote: previousDeadNote,
        note,
      },
    });
  }
}

export default new SetDeadNoteAction();

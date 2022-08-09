import { EditorActionResult, EditorActionSetGhostNote } from '../../editor-action-event';
import EditorActionInterface from '../editor-action.interface';

class SetGhostNoteAction extends EditorActionInterface<EditorActionSetGhostNote> {
  do(action: EditorActionSetGhostNote): EditorActionResult {
    const { note, value: isGhost } = action.data;
    action.data.previousValue = note.isGhost;
    note.isGhost = isGhost;
    return {
      requiresRerender: true,
      requiresMidiUpdate: true,
    };
  }

  undo(action: EditorActionSetGhostNote): EditorActionResult {
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

export default new SetGhostNoteAction();

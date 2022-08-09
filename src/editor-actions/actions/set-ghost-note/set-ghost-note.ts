import { EditorActionResult, EditorActionSetGhostNote } from '../../editor-action-event';
import EditorActionInterface from '../editor-action.interface';

class SetGhostNoteAction extends EditorActionInterface<EditorActionSetGhostNote> {
  do(action: EditorActionSetGhostNote): EditorActionResult {
    const { note, isGhost } = action.data;
    action.data.previousGhost = note.isGhost;
    note.isGhost = isGhost;
    return {
      requiresRerender: true,
      requiresMidiUpdate: true,
    };
  }

  undo(action: EditorActionSetGhostNote): EditorActionResult {
    const { note, previousGhost } = action.data;
    if (previousGhost === undefined) {
      return {
        requiresMidiUpdate: false,
        requiresRerender: false,
      };
    }
    return this.do({
      type: action.type,
      data: {
        isGhost: previousGhost,
        note,
      },
    });
  }
}

export default new SetGhostNoteAction();

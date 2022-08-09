import { EditorActionResult, EditorActionSetLetRing } from '../../editor-action-event';
import EditorActionInterface from '../editor-action.interface';

class SetLetRingNoteAction extends EditorActionInterface<EditorActionSetLetRing> {
  do(action: EditorActionSetLetRing): EditorActionResult {
    const { note, isLetRing } = action.data;
    action.data.previousLetRing = note.isLetRing;
    note.isLetRing = isLetRing;
    return {
      requiresRerender: true,
      requiresMidiUpdate: true,
    };
  }

  undo(action: EditorActionSetLetRing): EditorActionResult {
    const { note, previousLetRing } = action.data;
    note.isLetRing = previousLetRing!;
    return {
      requiresRerender: true,
      requiresMidiUpdate: true,
    };
  }
}

export default new SetLetRingNoteAction();

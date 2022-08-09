import { EditorActionResult, EditorActionSetLetRing } from '../../editor-action-event';
import EditorActionInterface from '../editor-action.interface';

class SetLetRingNoteAction extends EditorActionInterface<EditorActionSetLetRing> {
  do(action: EditorActionSetLetRing): EditorActionResult {
    const { note, isLetRing } = action.data;
    action.data.previousLetRing = note.isLetRing;
    note.isLetRing = isLetRing;
    note.beat.finish(null as any, {} as any);
    return {
      requiresRerender: true,
      requiresMidiUpdate: true,
    };
  }

  undo(action: EditorActionSetLetRing): EditorActionResult {
    const { note, previousLetRing } = action.data;
    if (previousLetRing === undefined) {
      return {
        requiresMidiUpdate: false,
        requiresRerender: false,
      };
    }
    return this.do({
      type: action.type,
      data: {
        isLetRing: previousLetRing,
        note,
      },
    });
  }
}

export default new SetLetRingNoteAction();

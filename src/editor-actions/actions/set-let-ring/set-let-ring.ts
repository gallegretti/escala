import { EditorActionResult, EditorActionSetLetRing } from '../../editor-action-event';
import EditorActionInterface from '../editor-action.interface';

class SetLetRingNoteAction extends EditorActionInterface<EditorActionSetLetRing> {
  do(action: EditorActionSetLetRing): EditorActionResult {
    const { note, value: isLetRing } = action.data;
    action.data.previousValue = note.isLetRing;
    note.isLetRing = isLetRing;
    note.beat.finish(null as any, {} as any);
    return {
      requiresRerender: true,
      requiresMidiUpdate: true,
    };
  }

  undo(action: EditorActionSetLetRing): EditorActionResult {
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

export default new SetLetRingNoteAction();

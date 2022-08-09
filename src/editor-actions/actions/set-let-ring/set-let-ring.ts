import { EditorActionResult, EditorActionSetLetRing } from '../../editor-action-event';
import EditorActionWithUndo from '../editor-action-with-undo';

class SetLetRingNoteAction extends EditorActionWithUndo<EditorActionSetLetRing> {
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
}

export default new SetLetRingNoteAction();

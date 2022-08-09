import { EditorActionResult, EditorActionSetFret } from '../../editor-action-event';
import EditorActionWithUndo from '../editor-action-with-undo';

class SetFretAction extends EditorActionWithUndo<EditorActionSetFret> {
  do(action: EditorActionSetFret): EditorActionResult {
    const { note, value: fret } = action.data;
    const didChange = note.fret !== fret;
    // Store previous fret so we can use it on the undo
    action.data.previousValue = action.data.note.fret;
    note.fret = fret;
    return {
      requiresRerender: didChange,
      requiresMidiUpdate: didChange,
    };
  }
}

export default new SetFretAction();

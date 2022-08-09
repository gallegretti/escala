import { EditorActionResult, EditorActionSetFret } from '../../editor-action-event';
import EditorActionInterface from '../editor-action.interface';

class SetFretAction extends EditorActionInterface<EditorActionSetFret> {
  do(action: EditorActionSetFret): EditorActionResult {
    const didChange = action.data.note.fret !== action.data.fret;
    // Store previous fret so we can use it on the undo
    action.data.previousFret = action.data.note.fret;
    action.data.note.fret = action.data.fret;
    return {
      requiresRerender: didChange,
      requiresMidiUpdate: didChange,
    };
  }

  undo(action: EditorActionSetFret): EditorActionResult {
    const { previousFret, note } = action.data;
    if (previousFret === undefined) {
      return {
        requiresMidiUpdate: false,
        requiresRerender: false,
      };
    }
    return this.do({
      type: action.type,
      data: {
        fret: previousFret,
        note,
      },
    });
  }
}

export default new SetFretAction();

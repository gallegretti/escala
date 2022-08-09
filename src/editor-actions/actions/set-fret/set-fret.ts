import { EditorActionResult, EditorActionSetFret } from '../../editor-action-event';
import EditorActionInterface from '../editor-action.interface';

class SetFretAction extends EditorActionInterface<EditorActionSetFret> {
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

  undo(action: EditorActionSetFret): EditorActionResult {
    const { previousValue, note } = action.data;
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

export default new SetFretAction();

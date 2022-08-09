import { EditorActionResult, EditorActionSetSlide } from '../../editor-action-event';
import EditorActionWithUndo from '../editor-action-with-undo';

class SetSlideAction extends EditorActionWithUndo<EditorActionSetSlide> {
  do(action: EditorActionSetSlide): EditorActionResult {
    const { note } = action.data;
    const nextNote = alphaTab.model.Note.nextNoteOnSameLine(note);
    if (!nextNote) {
      return {
        requiresMidiUpdate: false,
        requiresRerender: false,
      };
    }
    action.data.previousValue = note.slideTarget !== null;
    if (action.data.value) {
      note.slideTarget = nextNote;
      note.slideOutType = 1;
      nextNote.slideOrigin = note;
    } else {
      note.slideTarget = null;
      note.slideOutType = 0;
      nextNote.slideOrigin = null;
    }
    return {
      requiresRerender: true,
      requiresMidiUpdate: true,
    };
  }
}

export default new SetSlideAction();

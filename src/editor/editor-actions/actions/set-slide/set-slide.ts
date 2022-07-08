import { EditorActionResult, EditorActionSetSlide } from '../../editor-action-event';
import EditorActionInterface from '../editor-action.interface';

class SetSlideAction extends EditorActionInterface<EditorActionSetSlide> {
  do(action: EditorActionSetSlide): EditorActionResult {
    const { note } = action.data;
    const nextNote = alphaTab.model.Note.nextNoteOnSameLine(note);
    if (!nextNote) {
      return {
        requiresMidiUpdate: false,
        requiresRerender: false,
      };
    }
    action.data.previousSlide = note.slideTarget !== null;
    if (action.data.slide) {
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

  undo(action: EditorActionSetSlide): EditorActionResult {
    if (action.data.previousSlide !== undefined) {
      return this.do({
        type: action.type,
        data: {
          slide: action.data.previousSlide,
          note: action.data.note,
        },
      });
    }
    return {
      requiresRerender: false,
      requiresMidiUpdate: false,
    };
  }
}

export default new SetSlideAction();

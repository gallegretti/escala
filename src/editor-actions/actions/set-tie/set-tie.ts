import { EditorActionResult, EditorActionSetTie } from '../../editor-action-event';
import EditorActionInterface from '../editor-action.interface';

class SetTieAction extends EditorActionInterface<EditorActionSetTie> {
  do(action: EditorActionSetTie): EditorActionResult {
    const { note, tie } = action.data;
    const nextNote = alphaTab.model.Note.nextNoteOnSameLine(note);
    if (!nextNote) {
      return {
        requiresMidiUpdate: false,
        requiresRerender: false,
      };
    }
    action.data.previousTie = note.isTieOrigin;
    if (tie) {
      note.tieDestination = nextNote;
      nextNote.tieOrigin = note;
      nextNote.isTieDestination = true;
    } else if (note.tieDestination) {
      note.tieDestination.tieOrigin = null;
      note.tieDestination.isTieDestination = false;
      note.tieDestination = null;
    }
    return {
      requiresRerender: true,
      requiresMidiUpdate: true,
    };
  }

  undo(action: EditorActionSetTie): EditorActionResult {
    const { previousTie, note } = action.data;
    if (previousTie === undefined) {
      return {
        requiresMidiUpdate: false,
        requiresRerender: false,
      };
    }
    return this.do({
      type: action.type,
      data: {
        tie: previousTie,
        note,
      },
    });
  }
}

export default new SetTieAction();

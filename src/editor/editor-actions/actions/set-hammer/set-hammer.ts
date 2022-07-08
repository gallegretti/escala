import { EditorActionResult, EditorActionSetHammer } from '../../editor-action-event';
import EditorActionInterface from '../editor-action.interface';

class SetHammerAction extends EditorActionInterface<EditorActionSetHammer> {
  do(action: EditorActionSetHammer): EditorActionResult {
    const { note, hammerOrPull } = action.data;
    const nextNote = alphaTab.model.Note.findHammerPullDestination(note);
    if (!nextNote) {
      return {
        requiresMidiUpdate: false,
        requiresRerender: false,
      };
    }
    action.data.previousHammerOrPull = note.isHammerPullOrigin;
    if (hammerOrPull) {
      note.isHammerPullOrigin = true;
      note.hammerPullDestination = nextNote;
      nextNote.hammerPullOrigin = note;
    } else if (note.hammerPullDestination) {
      note.isHammerPullOrigin = false;
      note.hammerPullDestination.hammerPullOrigin = null;
      note.hammerPullDestination = null;
    }
    return {
      requiresRerender: true,
      requiresMidiUpdate: true,
    };
  }

  undo(action: EditorActionSetHammer): EditorActionResult {
    if (action.data.previousHammerOrPull !== undefined) {
      return this.do({
        type: action.type,
        data: {
          hammerOrPull: action.data.previousHammerOrPull,
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

export default new SetHammerAction();

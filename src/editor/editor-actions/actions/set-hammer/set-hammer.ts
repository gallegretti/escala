import { EditorActionResult, EditorActionSetHammer } from '../../editor-action-event';
import EditorActionInterface from '../editor-action.interface';

class SetHammerAction extends EditorActionInterface<EditorActionSetHammer> {
  do(action: EditorActionSetHammer): EditorActionResult {
    const { note, hammerOrPull } = action.data;
    console.log('set hammer')
    const nextNote = alphaTab.model.Note.findHammerPullDestination(note);
    if (!nextNote) {
      return {
        requiresMidiUpdate: false,
        requiresRerender: false,
      };
    }
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
    return {
      requiresRerender: true,
      requiresMidiUpdate: true,
    };
  }
}

export default new SetHammerAction();

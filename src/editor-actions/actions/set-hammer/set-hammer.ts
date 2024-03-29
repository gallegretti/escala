import { EditorActionResult, EditorActionSetHammer } from '../../editor-action-event';
import EditorActionWithUndo from '../editor-action-with-undo';

class SetHammerAction extends EditorActionWithUndo<EditorActionSetHammer> {
  do(action: EditorActionSetHammer): EditorActionResult {
    const { note, value: hammerOrPull } = action.data;
    const nextNote = alphaTab.model.Note.findHammerPullDestination(note);
    if (!nextNote) {
      return {
        requiresMidiUpdate: false,
        requiresRerender: false,
      };
    }
    action.data.previousValue = note.isHammerPullOrigin;
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
}

export default new SetHammerAction();

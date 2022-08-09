import { Note } from '../../../alphatab-types/alphatab-types';
import { EditorActionResult, EditorActionEventRemoveNote } from '../../editor-action-event';
import EditorActionInterface from '../editor-action.interface';

class RemoveNoteAction extends EditorActionInterface<EditorActionEventRemoveNote> {
  do(action: EditorActionEventRemoveNote): EditorActionResult {
    const { note } = action.data;
    if (note.hammerPullOrigin) {
      note.hammerPullOrigin.hammerPullDestination = null;
      note.hammerPullOrigin = null;
    }
    if (note.hammerPullDestination) {
      note.hammerPullDestination.hammerPullOrigin = null;
      note.hammerPullDestination = null;
    }
    note.beat.removeNote(note);
    return {
      requiresRerender: true,
      requiresMidiUpdate: true,
    };
  }

  undo(action: EditorActionEventRemoveNote): EditorActionResult {
    const { note } = action.data;
    const hasNoteOnString = note.beat.notes.find((beatNote: Note) => beatNote.string === note.string) !== undefined;
    if (hasNoteOnString) {
      // Do not add an existing note
      return {
        requiresRerender: false,
        requiresMidiUpdate: false,
      };
    }
    note.beat.addNote(note);
    note.beat.finish(null as any, {} as any);
    return {
      requiresRerender: true,
      requiresMidiUpdate: true,
    };
  }

  canUndo(): boolean {
    return true;
  }
}

export default new RemoveNoteAction();

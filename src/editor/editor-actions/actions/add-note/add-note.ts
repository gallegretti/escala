import { Note } from '../../../../alphatab-types/alphatab-types';
import { EditorActionResult, EditorActionEventAddNote } from '../../editor-action-event';
import EditorActionInterface from '../editor-action.interface';

class AddNoteAction extends EditorActionInterface<EditorActionEventAddNote> {
  do(action: EditorActionEventAddNote): EditorActionResult {
    const { beat, note } = action.data;
    const hasNoteOnString = beat.notes.find((beatNote: Note) => beatNote.string === note.string) !== undefined;
    if (hasNoteOnString) {
      // Do not add an existing note
      return {
        requiresRerender: false,
        requiresMidiUpdate: false,
      };
    }
    beat.addNote(note);
    beat.finish(null as any, new Map<string, unknown>());
    return {
      requiresRerender: true,
      requiresMidiUpdate: true,
    };
  }

  undo(action: EditorActionEventAddNote): EditorActionResult {
    const { beat, note } = action.data;
    beat.removeNote(note);
    return {
      requiresRerender: true,
      requiresMidiUpdate: true,
    };
  }
}

export default new AddNoteAction();

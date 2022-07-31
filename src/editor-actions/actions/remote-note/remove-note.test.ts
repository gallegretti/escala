import { mock } from 'jest-mock-extended';
import removeNoteAction from './remove-note';
import { EditorActionEventRemoveNote } from '../../editor-action-event';
import { Beat, Note } from '../../../alphatab-types/alphatab-types';

describe('remove-note', () => {
  describe('do', () => {
    test('should remove the note if the beat contains it', () => {
      const note = mock<Note>({});
      const beat = mock<Beat>({
        notes: [note],
        removeNote: jest.fn(),
      });
      note.beat = beat;
      const event: EditorActionEventRemoveNote = {
        type: 'remove-note',
        data: {
          note,
        },
      };
      const result = removeNoteAction.do(event);
      expect(result.requiresRerender).toBe(true);
      expect(result.requiresMidiUpdate).toBe(true);
      expect(beat.removeNote).toHaveBeenCalledWith(note);
    });

    test('should remove any hammer or pull out', () => {
      const note = mock<Note>({});
      const note2 = mock<Note>({});
      const beat = mock<Beat>({
        notes: [note, note2],
        removeNote: jest.fn(),
      });
      note.hammerPullDestination = note2;
      note2.hammerPullOrigin = note;
      note.beat = beat;
      const event: EditorActionEventRemoveNote = {
        type: 'remove-note',
        data: {
          note,
        },
      };
      const result = removeNoteAction.do(event);
      expect(result.requiresRerender).toBe(true);
      expect(result.requiresMidiUpdate).toBe(true);
      expect(beat.removeNote).toHaveBeenCalledWith(note);
      expect(note.hammerPullDestination).toBe(null);
      expect(note2.hammerPullOrigin).toBe(null);
    });
  });

  describe('undo', () => {
    test('should add the note back to the beat', () => {
      const beat = mock<Beat>({
        notes: [],
        addNote: jest.fn(),
        finish: jest.fn(),
      });
      const note = mock<Note>({
        beat,
      });
      const event: EditorActionEventRemoveNote = {
        type: 'remove-note',
        data: {
          note,
        },
      };
      const result = removeNoteAction.undo(event);
      expect(result.requiresRerender).toBe(true);
      expect(result.requiresMidiUpdate).toBe(true);
      expect(beat.addNote).toHaveBeenCalledWith(note);
      expect(beat.finish).toHaveBeenCalled();
    });
  });
});

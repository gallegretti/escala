import { mock } from 'jest-mock-extended';
import importNoteAction from './add-note';
import { EditorActionAddNote } from '../../editor-action-event';
import { Beat, Note } from '../../../alphatab-types/alphatab-types';

describe('add-note', () => {
  describe('do', () => {
    test('should add the note if the beat allows it', () => {
      const beat = mock<Beat>({
        notes: [],
        addNote: jest.fn(),
        finish: jest.fn(),
      });
      const note = mock<Note>({});
      const event: EditorActionAddNote = {
        type: 'add-note',
        data: {
          beat,
          note,
        },
      };
      const result = importNoteAction.do(event);
      expect(result.requiresRerender).toBe(true);
      expect(beat.addNote).toHaveBeenCalled();
      expect(beat.finish).toHaveBeenCalled();
    });
    test('should not add the note if the beat already has a note on the string', () => {
      const beat = mock<Beat>({
        notes: [{
          string: 1,
        }],
        addNote: jest.fn(),
        finish: jest.fn(),
      });
      const note = mock<Note>({
        string: 1,
      });
      const event: EditorActionAddNote = {
        type: 'add-note',
        data: {
          beat,
          note,
        },
      };
      const result = importNoteAction.do(event);
      expect(result.requiresRerender).toBe(false);
      expect(beat.addNote).not.toHaveBeenCalled();
      expect(beat.finish).not.toHaveBeenCalled();
    });
  });

  describe('undo', () => {
    test('should remove the note from the beat', () => {
      const beat = mock<Beat>({
        notes: [],
        removeNote: jest.fn(),
      });
      const note = mock<Note>({});
      const event: EditorActionAddNote = {
        type: 'add-note',
        data: {
          beat,
          note,
        },
      };
      const result = importNoteAction.undo(event);
      expect(result.requiresRerender).toBe(true);
      expect(beat.removeNote).toHaveBeenCalledWith(event.data.note);
    });
  });
});

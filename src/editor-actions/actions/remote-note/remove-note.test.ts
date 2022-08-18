import { mock } from 'jest-mock-extended';
import removeNoteAction from './remove-note';
import { EditorActionEventRemoveNote } from '../../editor-action-event';
import { Beat, Note } from '../../../alphatab-types/alphatab-types';

globalThis.alphaTab = {
  model: {
    SlideOutType: {
      None: 0,
    },
  },
} as any;

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

    test('should remove any slide from slide origin', () => {
      const note = mock<Note>({});
      const note2 = mock<Note>({});
      const beat = mock<Beat>({
        notes: [note, note2],
        removeNote: jest.fn(),
      });
      // Set beat
      note.beat = beat;
      note2.beat = beat;
      // Slide from note to note2
      note.slideTarget = note2;
      note2.slideOrigin = note;
      note.slideOutType = 1;
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
      expect(note.slideTarget).toBe(null);
      expect(note.slideOutType).toBe(0);
    });

    test('should remove any slide from slide target', () => {
      const note = mock<Note>({});
      const note2 = mock<Note>({});
      const beat = mock<Beat>({
        notes: [note, note2],
        removeNote: jest.fn(),
      });
      // Set beat
      note.beat = beat;
      note2.beat = beat;
      // Slide from note to note2
      note.slideTarget = note2;
      note2.slideOrigin = note;
      note.slideOutType = 1;
      const event: EditorActionEventRemoveNote = {
        type: 'remove-note',
        data: {
          note: note2,
        },
      };
      const result = removeNoteAction.do(event);
      expect(result.requiresRerender).toBe(true);
      expect(result.requiresMidiUpdate).toBe(true);
      expect(beat.removeNote).toHaveBeenCalledWith(note2);
      expect(note.slideTarget).toBe(null);
      expect(note.slideOutType).toBe(0);
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

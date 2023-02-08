import { mock } from 'jest-mock-extended';
import setTieAction from './set-tie';
import { EditorActionSetTie } from '../../editor-action-event';
import { Note } from '../../../alphatab-types/alphatab-types';

let nextNote: Note | null = null;

globalThis.alphaTab = {
  model: {
    Note: {
      nextNoteOnSameLine: () => nextNote,
    },
  },
} as any;

describe('set-tie', () => {
  describe('do', () => {
    test('should do nothing if there\'s no note on the same line', () => {
      nextNote = null;
      const note = mock<Note>({
      });
      const event: EditorActionSetTie = {
        type: 'set-tie',
        data: {
          value: true,
          note,
        },
      };
      const result = setTieAction.do(event);
      expect(result.requiresRerender).toBe(false);
      expect(result.requiresMidiUpdate).toBe(false);
    });

    test('should tie to the next note in the same line', () => {
      const note = mock<Note>();
      nextNote = mock<Note>();
      const event: EditorActionSetTie = {
        type: 'set-tie',
        data: {
          value: true,
          note,
        },
      };
      const result = setTieAction.do(event);
      expect(result.requiresRerender).toBe(true);
      expect(result.requiresMidiUpdate).toBe(true);
      expect(note.tieDestination).toBe(nextNote);
      expect(nextNote.tieOrigin).toBe(note);
    });

    test('should untie the note', () => {
      const note = mock<Note>();
      nextNote = mock<Note>();
      note.tieDestination = nextNote;
      nextNote.tieOrigin = note;
      const event: EditorActionSetTie = {
        type: 'set-tie',
        data: {
          value: false,
          note,
        },
      };
      const result = setTieAction.do(event);
      expect(result.requiresRerender).toBe(true);
      expect(result.requiresMidiUpdate).toBe(true);
      expect(note.tieDestination).toBe(null);
      expect(nextNote.tieOrigin).toBe(null);
    });
  });
});

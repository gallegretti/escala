import { mock } from 'jest-mock-extended';
import setHammerAction from './set-hammer';
import { EditorActionSetHammer } from '../../editor-action-event';
import { Note } from '../../../../alphatab-types/alphatab-types';

let nextNote: Note | null = null;

globalThis.alphaTab = {
  model: {
    Note: {
      findHammerPullDestination: () => nextNote,
    },
  },
} as any;

describe('set-hammer', () => {
  describe('do', () => {
    test('should do nothing if there\'s no note destination', () => {
      nextNote = null;
      const note = mock<Note>({
      });
      const event: EditorActionSetHammer = {
        type: 'set-hammer',
        data: {
          hammerOrPull: true,
          note,
        },
      };
      const result = setHammerAction.do(event);
      expect(result.requiresRerender).toBe(false);
      expect(result.requiresMidiUpdate).toBe(false);
    });

    test('should set the hammer in', () => {
      const note = mock<Note>();
      nextNote = mock<Note>();
      const event: EditorActionSetHammer = {
        type: 'set-hammer',
        data: {
          hammerOrPull: true,
          note,
        },
      };
      const result = setHammerAction.do(event);
      expect(result.requiresRerender).toBe(true);
      expect(result.requiresMidiUpdate).toBe(true);
      expect(note.isHammerPullOrigin).toBe(true);
      expect(note.hammerPullDestination).toBe(nextNote);
      expect(nextNote.hammerPullOrigin).toBe(note);
    });

    test('should unset the hammer in', () => {
      const note = mock<Note>();
      nextNote = mock<Note>();
      note.hammerPullDestination = nextNote;
      nextNote.hammerPullOrigin = note;
      const event: EditorActionSetHammer = {
        type: 'set-hammer',
        data: {
          hammerOrPull: false,
          note,
        },
      };
      const result = setHammerAction.do(event);
      expect(result.requiresRerender).toBe(true);
      expect(result.requiresMidiUpdate).toBe(true);
      expect(note.isHammerPullOrigin).toBe(false);
      expect(note.hammerPullDestination).toBe(null);
      expect(nextNote.hammerPullOrigin).toBe(null);
    });
  });
});

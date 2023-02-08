import { mock } from 'jest-mock-extended';
import setChordAction from './set-chord';
import { EditorActionSetChord } from '../../editor-action-event';
import { Beat, Chord, Note } from '../../../alphatab-types/alphatab-types';

globalThis.alphaTab = {
  model: {
    Note: jest.fn(() => mock<Note>({})),
  },
} as any;

const chordAm = mock<Chord>({
  name: 'Am',
  showDiagram: true,
  showFingering: true,
  showName: true,
  firstFret: 1,
  strings: [0, 1, 2, 2, 0, -1],
});

describe('set-chord', () => {
  describe('do', () => {
    test('should add the given chord', () => {
      const beat = mock<Beat>({
        notes: [],
        addNote: jest.fn(),
        finish: jest.fn(),
        voice: {
          bar: {
            staff: {
              addChord: jest.fn(),
            },
          },
        },
      });

      const event: EditorActionSetChord = {
        type: 'set-chord',
        data: {
          beat,
          value: chordAm,
        },
      };
      const result = setChordAction.do(event);
      expect(result.requiresRerender).toBe(true);
      expect(result.requiresMidiUpdate).toBe(true);
      expect(beat.voice.bar.staff.addChord).toBeCalledWith('Am', event.data.value);
      expect(beat.addNote).toBeCalledTimes(5); // Am chord has 5 played notes
    });

    test('should not add or remove any note if there\'s already at least one note on the beat', () => {
      const beat = mock<Beat>({
        notes: [
          mock<Note>({}), // One note on the beat
        ],
        addNote: jest.fn(),
        finish: jest.fn(),
        voice: {
          bar: {
            staff: {
              addChord: jest.fn(),
            },
          },
        },
      });

      const event: EditorActionSetChord = {
        type: 'set-chord',
        data: {
          beat,
          value: chordAm,
        },
      };
      const result = setChordAction.do(event);
      expect(result.requiresRerender).toBe(true);
      // Since the notes are not modified, midi update is not required
      expect(result.requiresMidiUpdate).toBe(false);
      expect(beat.voice.bar.staff.addChord).toBeCalledWith('Am', event.data.value);
      expect(beat.removeNote).not.toBeCalled();
      expect(beat.addNote).not.toBeCalled();
    });
  });

  describe('undo', () => {
    test('should remove the chordId from the beat', () => {
      const beat = mock<Beat>({
        notes: [
        ],
        addNote: jest.fn(),
        finish: jest.fn(),
      });
      const event: EditorActionSetChord = {
        type: 'set-chord',
        data: {
          beat,
          value: chordAm,
          previousValue: null,
        },
      };
      const result = setChordAction.undo(event);
      // Since the notes are not removed, midi update is not required
      expect(result.requiresMidiUpdate).toBe(false);
      expect(result.requiresRerender).toBe(true);
    });
  });
});

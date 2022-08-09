import { mock } from 'jest-mock-extended';
import setFretAction from './set-fret';
import { EditorActionSetFret } from '../../editor-action-event';
import { Note } from '../../../alphatab-types/alphatab-types';

describe('set-fret', () => {
  describe('do', () => {
    test('should set the new fret value', () => {
      const event: EditorActionSetFret = {
        type: 'set-fret',
        data: {
          value: 1,
          note: mock<Note>({
            fret: 0,
          }),
        },
      };
      const result = setFretAction.do(event);
      expect(result.requiresRerender).toBe(true);
      expect(event.data.note.fret).toBe(1);
      expect(event.data.previousValue).toBe(0);
    });

    test('should not request rerender if the fret is the same', () => {
      const event: EditorActionSetFret = {
        type: 'set-fret',
        data: {
          value: 1,
          note: mock<Note>({
            fret: 1,
          }),
        },
      };
      const result = setFretAction.do(event);
      expect(result.requiresRerender).toBe(false);
      expect(event.data.note.fret).toBe(1);
      expect(event.data.previousValue).toBe(1);
    });
  });

  describe('undo', () => {
    test('should set the previous fret value', () => {
      const event: EditorActionSetFret = {
        type: 'set-fret',
        data: {
          value: 1,
          previousValue: 0,
          note: mock<Note>({
            fret: 1,
          }),
        },
      };
      const result = setFretAction.undo(event);
      expect(result.requiresRerender).toBe(true);
      expect(event.data.note.fret).toBe(0);
    });
  });
});

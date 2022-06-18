import { mock } from 'jest-mock-extended';
import setDurationAction from './set-duration';
import { EditorActionSetDuration } from '../../editor-action-event';
import { Beat } from '../../../../alphatab-types/alphatab-types';

describe('set-duration', () => {
  describe('do', () => {
    test('should set the new beat duration', () => {
      const beat = mock<Beat>({
        duration: 1,
      });
      const event: EditorActionSetDuration = {
        type: 'set-duration',
        data: {
          beat,
          duration: 8,
        },
      };
      const result = setDurationAction.do(event);
      expect(result.requiresRerender).toBe(true);
      expect(result.requiresMidiUpdate).toBe(true);
      expect(event.data.previousDuration).toBe(1);
      expect(beat.duration).toBe(8);
    });

    test('should not request rerender if the duration is the same', () => {
      const beat = mock<Beat>({
        duration: 1,
      });
      const event: EditorActionSetDuration = {
        type: 'set-duration',
        data: {
          beat,
          duration: 1,
        },
      };
      const result = setDurationAction.do(event);
      expect(result.requiresRerender).toBe(false);
      expect(result.requiresMidiUpdate).toBe(false);
    });
  });

  describe('undo', () => {
    test('should set the previous beat duration', () => {
      const beat = mock<Beat>({
        duration: 8,
      });
      const event: EditorActionSetDuration = {
        type: 'set-duration',
        data: {
          beat,
          duration: 8,
          previousDuration: 1,
        },
      };
      const result = setDurationAction.undo(event);
      expect(result.requiresRerender).toBe(true);
      expect(result.requiresMidiUpdate).toBe(true);
      expect(beat.duration).toBe(1);
    });
  });
});

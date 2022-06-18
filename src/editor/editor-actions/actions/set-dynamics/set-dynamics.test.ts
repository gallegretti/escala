import { mock } from 'jest-mock-extended';
import setDynamicsAction from './set-dynamics';
import { EditorActionSetDynamics } from '../../editor-action-event';
import { Beat } from '../../../../alphatab-types/alphatab-types';

describe('set-dynamics', () => {
  describe('do', () => {
    test('should set the note dynamics', () => {
      const beat = mock<Beat>({
        dynamics: 5,
      });
      const event: EditorActionSetDynamics = {
        type: 'set-dynamics',
        data: {
          beat,
          dynamics: 6,
        },
      };
      const result = setDynamicsAction.do(event);
      expect(result.requiresRerender).toBe(true);
      expect(result.requiresMidiUpdate).toBe(true);
      expect(event.data.previousDynamics).toBe(5);
    });

    test('should not request rerender if the dynamics is the same', () => {
      const beat = mock<Beat>({
        dynamics: 5,
      });
      const event: EditorActionSetDynamics = {
        type: 'set-dynamics',
        data: {
          beat,
          dynamics: 5,
        },
      };
      const result = setDynamicsAction.do(event);
      expect(result.requiresRerender).toBe(false);
      expect(result.requiresMidiUpdate).toBe(false);
    });
  });

  describe('undo', () => {
    test('should set the previous dynamics', () => {
      const beat = mock<Beat>({
        dynamics: 6,
      });
      const event: EditorActionSetDynamics = {
        type: 'set-dynamics',
        data: {
          beat,
          dynamics: 6,
          previousDynamics: 5,
        },
      };
      const result = setDynamicsAction.undo(event);
      expect(result.requiresRerender).toBe(true);
      expect(result.requiresMidiUpdate).toBe(true);
      expect(event.data.previousDynamics).toBe(5);
    });
  });
});

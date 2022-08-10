import { mock } from 'jest-mock-extended';
import { BendPoint, Note } from '../../../alphatab-types/alphatab-types';
import { EditorActionSetBend } from '../../editor-action-event';
import setBend from './set-bend';

globalThis.alphaTab = {
  model: {
    BendPoint: jest.fn(() => mock<BendPoint>({})),
  },
} as any;

describe('set-bend', () => {
  describe('do', () => {
    test('should add the bend points', () => {
      const note = mock<Note>({
        addBendPoint: jest.fn(),
      });
      const action: EditorActionSetBend = {
        type: 'set-bend',
        data: {
          note,
          value: {
            bend: 'full',
            preBend: null,
            release: null,
          },
        },
      };
      const result = setBend.do(action);
      expect(result.requiresMidiUpdate).toBe(true);
      expect(result.requiresRerender).toBe(true);
      expect(note.addBendPoint).toHaveBeenCalledTimes(3);
    });
  });
});

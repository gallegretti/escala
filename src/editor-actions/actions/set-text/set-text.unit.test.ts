import { mock } from 'jest-mock-extended';
import setTextAction from './set-text';
import { EditorActionSetText } from '../../editor-action-event';
import { Beat } from '../../../alphatab-types/alphatab-types';

describe('set-text', () => {
  describe('do', () => {
    test('should set the new text value', () => {
      const event: EditorActionSetText = {
        type: 'set-text',
        data: {
          value: 'new text',
          beat: mock<Beat>({
            text: 'old text',
          }),
        },
      };
      const result = setTextAction.do(event);
      expect(result.requiresRerender).toBe(true);
      expect(result.requiresMidiUpdate).toBe(false);
      expect(event.data.beat.text).toEqual('new text');
      expect(event.data.previousValue).toEqual('old text');
    });
  });

  describe('undo', () => {
    test('should set the previous text value', () => {
      const event: EditorActionSetText = {
        type: 'set-text',
        data: {
          previousValue: 'old text',
          value: 'new text',
          beat: mock<Beat>({
            text: 'new text',
          }),
        },
      };
      const result = setTextAction.undo(event);
      expect(result.requiresRerender).toBe(true);
      expect(result.requiresMidiUpdate).toBe(false);
      expect(event.data.beat.text).toEqual('old text');
    });
  });
});

import { mock } from 'jest-mock-extended';
import setPalmMuteAction from './set-palm-mute';
import { EditorActionSetPalmMute } from '../../editor-action-event';
import { Note } from '../../../alphatab-types/alphatab-types';

describe('set-palm-mute', () => {
  describe('do', () => {
    test('should set the palm mute value', () => {
      const event: EditorActionSetPalmMute = {
        type: 'set-palm-mute',
        data: {
          isPalmMute: true,
          note: mock<Note>({
            isPalmMute: false,
          }),
        },
      };
      const result = setPalmMuteAction.do(event);
      expect(result.requiresRerender).toBe(true);
      expect(event.data.note.isPalmMute).toBe(true);
    });
  });

  describe('undo', () => {
    test('should unset the palm mute value', () => {
      const event: EditorActionSetPalmMute = {
        type: 'set-palm-mute',
        data: {
          isPalmMute: true,
          note: mock<Note>({
            isPalmMute: true,
          }),
          previousPalmMute: false,
        },
      };
      const result = setPalmMuteAction.undo(event);
      expect(result.requiresRerender).toBe(true);
      expect(event.data.note.isPalmMute).toBe(false);
    });
  });
});

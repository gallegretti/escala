import { mock } from 'jest-mock-extended';
import setScoreInfo from './set-score-info';
import { EditorActionSetScoreInfo } from '../../editor-action-event';
import { Score } from '../../../../alphatab-types/alphatab-types';

describe('set-score-info', () => {
  describe('do', () => {
    test('should set the new score info value', () => {
      const score = mock<Score>({});
      const event: EditorActionSetScoreInfo = {
        type: 'set-score-info',
        data: {
          score,
          scoreInfo: {
            album: 'New Album',
            artist: 'New Artist',
            notices: 'New Notices',
            subTitle: 'New Subtitle',
            tab: 'New Tab',
            title: 'New Title',
            words: 'New Words',
          },
        },
      };
      const result = setScoreInfo.do(event);
      expect(result.requiresRerender).toBe(true);
      expect(result.requiresMidiUpdate).toBe(false);
      expect(score.album).toEqual('New Album');
      expect(score.artist).toEqual('New Artist');
      expect(score.notices).toEqual('New Notices');
      expect(score.subTitle).toEqual('New Subtitle');
      expect(score.tab).toEqual('New Tab');
      expect(score.title).toEqual('New Title');
      expect(score.words).toEqual('New Words');
    });
  });

  describe('undo', () => {
    test('Should not undo', () => {
      expect(setScoreInfo.canUndo()).toBe(false);
    });
  });
});

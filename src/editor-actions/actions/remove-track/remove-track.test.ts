import { mock } from 'jest-mock-extended';
import { Score, Track } from '../../../alphatab-types/alphatab-types';
import { EditorActionEventRemoveTrack } from '../../editor-action-event';
import removeTrack from './remove-track';

describe('remove-track', () => {
  describe('do', () => {
    test('should remove the given track from the score', () => {
      const trackA = mock<Track>({
        index: 0,
        name: 'Track A',
      });
      const trackB = mock<Track>({
        index: 1,
        name: 'Track B',
      });
      const trackC = mock<Track>({
        index: 2,
        name: 'Track C',
      });
      const score = mock<Score>({
        tracks: [trackA, trackB, trackC],
      });
      trackA.score = score;
      trackB.score = score;
      trackC.score = score;
      const event: EditorActionEventRemoveTrack = {
        type: 'remove-track',
        data: {
          track: trackB,
        },
      };
      const result = removeTrack.do(event);
      expect(result.requiresMidiUpdate).toBe(true);
      expect(result.requiresRerender).toBe(true);
      expect(score.tracks.length).toBe(2);
      expect(score.tracks[0].name).toBe('Track A');
      expect(score.tracks[0].index).toBe(0);
      expect(score.tracks[1].name).toBe('Track C');
      expect(score.tracks[1].index).toBe(1); // New calculated index
    })
  })
});

import { EditorActionResult, EditorActionEventRemoveTrack } from '../../editor-action-event';
import EditorActionWithoutUndo from '../editor-action-without-undo';

class RemoveTrackAction extends EditorActionWithoutUndo<EditorActionEventRemoveTrack> {
  do(action: EditorActionEventRemoveTrack): EditorActionResult {
    const { score } = action.data.track;
    score.tracks.splice(action.data.track.index, 1);
    score.tracks.forEach((track, i) => {
      track.index = i;
    });
    return {
      requiresRerender: true,
      requiresMidiUpdate: true,
    };
  }
}

export default new RemoveTrackAction();

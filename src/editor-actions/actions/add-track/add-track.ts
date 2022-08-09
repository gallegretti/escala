import { EditorActionResult, EditorActionAddTrack } from '../../editor-action-event';
import EditorActionWithoutUndo from '../editor-action-without-undo';

class AddTrackAction extends EditorActionWithoutUndo<EditorActionAddTrack> {
  do(action: EditorActionAddTrack): EditorActionResult {
    const { trackInfo: track, score } = action.data;
    const trackModel = new alphaTab.model.Track();
    trackModel.name = track.name;
    trackModel.ensureStaveCount(1);
    // trackModel.finish(null as any, null as any);
    score.addTrack(trackModel);
    score.finish(null as any);
    return {
      requiresRerender: false,
      requiresMidiUpdate: false,
    };
  }
}

export default new AddTrackAction();

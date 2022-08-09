import { EditorActionResult, EditorActionEditTrack } from '../../editor-action-event';
import EditorActionWithoutUndo from '../editor-action-without-undo';

class EditTrackAction extends EditorActionWithoutUndo<EditorActionEditTrack> {
  do(action: EditorActionEditTrack): EditorActionResult {
    const { track, trackInfo } = action.data;
    track.name = trackInfo.name;
    track.shortName = trackInfo.name;
    track.staves.forEach((staff) => {
      staff.capo = trackInfo.capo;
      staff.stringTuning = trackInfo.tuning;
    });
    return {
      requiresRerender: true,
      requiresMidiUpdate: true,
    };
  }
}

export default new EditTrackAction();

import { EditorActionResult, EditorActionEditTrack } from '../../editor-action-event';
import EditorActionInterface from '../editor-action.interface';

class EditTrackAction extends EditorActionInterface<EditorActionEditTrack> {
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

  undo(action: EditorActionEditTrack): EditorActionResult {
    return {
      requiresRerender: true,
      requiresMidiUpdate: true,
    };
  }

  canUndo(): boolean {
    return false;
  }
}

export default new EditTrackAction();

import { EditorActionResult, EditorActionAddTrack } from "../../editor-action-event";
import EditorActionInterface from "../editor-action.interface";

class AddTrackAction extends EditorActionInterface<EditorActionAddTrack> {
    do(action: EditorActionAddTrack): EditorActionResult {
        const { track, score } = action.data;
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

    undo(action: EditorActionAddTrack): EditorActionResult {
        return {
            requiresRerender: true,
            requiresMidiUpdate: true
        }
    }

    canUndo(): boolean {
        return false;
    }
}

export default new AddTrackAction();

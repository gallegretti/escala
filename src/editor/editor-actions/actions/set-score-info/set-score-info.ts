import { EditorActionResult, EditorActionSetScoreInfo } from "../../editor-action-event";
import EditorActionInterface from "../editor-action.interface";

class SetScoreInfoAction extends EditorActionInterface<EditorActionSetScoreInfo> {
    do(action: EditorActionSetScoreInfo): EditorActionResult {
        const { score, scoreInfo } = action.data;
        score.title = scoreInfo.title;
        score.subTitle = scoreInfo.subTitle;
        score.album = scoreInfo.album;
        score.artist = scoreInfo.artist;
        score.tab = scoreInfo.tab;
        score.words = scoreInfo.words;
        score.notices = scoreInfo.notices;
        return {
            requiresRerender: true,
            requiresMidiUpdate: false
        }
    }

    undo(action: EditorActionSetScoreInfo): EditorActionResult {
        // Can not undo
        return {
            requiresRerender: false,
            requiresMidiUpdate: false
        }
    }

    canUndo() {
        return false;
    }
}

export default new SetScoreInfoAction();

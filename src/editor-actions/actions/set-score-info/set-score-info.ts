import { EditorActionResult, EditorActionSetScoreInfo } from '../../editor-action-event';
import EditorActionWithoutUndo from '../editor-action-without-undo';

class SetScoreInfoAction extends EditorActionWithoutUndo<EditorActionSetScoreInfo> {
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
      requiresMidiUpdate: false,
    };
  }
}

export default new SetScoreInfoAction();

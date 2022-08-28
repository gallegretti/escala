import { Beat } from '../../../alphatab-types/alphatab-types';
import { EditorActionResult, EditorActionSetFermata } from '../../editor-action-event';
import EditorActionWithUndo from '../editor-action-with-undo';

class SetFermataAction extends EditorActionWithUndo<EditorActionSetFermata> {
  do(action: EditorActionSetFermata): EditorActionResult {
    const { beat, value } = action.data;
    action.data.previousValue = beat.fermata ?? undefined;
    beat.fermata = value;
    this.removeFermataFromMasterbar(beat);
    beat.voice.finish(null as any, null as any);
    return {
      requiresRerender: true,
      requiresMidiUpdate: true,
    };
  }

  removeFermataFromMasterbar(beat: Beat) {
    // AlphaTab does not have an existing function for removing a fermata
    const masterBarFermata = beat.voice.bar.masterBar.fermata;
    if (!masterBarFermata) {
      return;
    }
    if (masterBarFermata.has(beat.playbackStart)) {
      masterBarFermata?.delete(beat.playbackStart);
    }
  }
}

export default new SetFermataAction();

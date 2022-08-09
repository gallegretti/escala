import { EditorActionResult, EditorActionSetTempo } from '../../editor-action-event';
import EditorActionWithoutUndo from '../editor-action-without-undo';

class SetTempoAction extends EditorActionWithoutUndo<EditorActionSetTempo> {
  do(action: EditorActionSetTempo): EditorActionResult {
    const { tempo, score } = action.data;
    score.tempo = tempo;
    score.masterBars.forEach((masterBar) => {
      if (masterBar.tempoAutomation) {
        masterBar.tempoAutomation.value = tempo;
      }
    });
    return {
      requiresRerender: true,
      requiresMidiUpdate: true,
    };
  }
}

export default new SetTempoAction();

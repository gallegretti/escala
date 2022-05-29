import { EditorActionResult, EditorActionSetTempo } from "../../editor-action-event";
import EditorActionInterface from "../editor-action.interface";

class SetTempoAction extends EditorActionInterface<EditorActionSetTempo> {
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

    undo(action: EditorActionSetTempo): EditorActionResult {
        return {
            requiresRerender: true,
            requiresMidiUpdate: true
        }
    }

    canUndo(): boolean {
        return false;
    }
}

export default new SetTempoAction();

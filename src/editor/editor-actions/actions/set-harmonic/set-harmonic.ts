import { EditorActionResult, EditorActionSetHarmonic } from "../../editor-action-event";
import EditorActionInterface from "../editor-action.interface";

class SetHarmonicAction extends EditorActionInterface<EditorActionSetHarmonic> {
    do(action: EditorActionSetHarmonic): EditorActionResult {
        const { note, harmonic } = action.data;
        action.data.previousHarmonic = note.harmonicValue;
        note.harmonicType = harmonic;
        return {
            requiresRerender: true,
            requiresMidiUpdate: true
        }
    }

    undo(action: EditorActionSetHarmonic): EditorActionResult {
        const { note, previousHarmonic } = action.data;
        note.harmonicType = previousHarmonic!;
        return {
            requiresRerender: true,
            requiresMidiUpdate: true
        }
    }
}

export default new SetHarmonicAction()
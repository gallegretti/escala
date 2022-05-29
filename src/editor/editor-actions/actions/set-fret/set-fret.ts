import { EditorActionResult, EditorActionSetFret } from "../../editor-action-event";
import EditorActionInterface from "../editor-action.interface";

class SetFretAction extends EditorActionInterface<EditorActionSetFret> {
    do(action: EditorActionSetFret): EditorActionResult {
        const didChange = action.data.note.fret !== action.data.fret;
        // Store previous fret so we can use it on the undo
        action.data.previousFret = action.data.note.fret;
        action.data.note.fret = action.data.fret;
        return {
            requiresRerender: didChange,
            requiresMidiUpdate: didChange
        }
    }

    undo(action: EditorActionSetFret): EditorActionResult {
        action.data.note.fret = action.data.previousFret!;
        return {
            requiresRerender: true,
            requiresMidiUpdate: true
        }
    }
}

export default new SetFretAction();

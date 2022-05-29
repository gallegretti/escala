import { EditorActionResult, EditorActionSetGhostNote } from "../../editor-action-event";
import EditorActionInterface from "../editor-action.interface";

class SetGhostNoteAction extends EditorActionInterface<EditorActionSetGhostNote> {
    do(action: EditorActionSetGhostNote): EditorActionResult {
        const { note, isGhost } = action.data;
        action.data.previousGhost = note.isGhost;
        note.isGhost = isGhost;
        return {
            requiresRerender: true,
            requiresMidiUpdate: true
        }
    }

    undo(action: EditorActionSetGhostNote): EditorActionResult {
        const { note, previousGhost } = action.data;
        note.isGhost = previousGhost!;
        return {
            requiresRerender: true,
            requiresMidiUpdate: true
        }
    }
}

export default new SetGhostNoteAction()
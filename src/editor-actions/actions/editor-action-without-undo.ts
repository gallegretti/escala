import { EditorActionNotUndoable, EditorActionResult } from '../editor-action-event';
import EditorActionInterface from './editor-action.interface';

abstract class EditorActionWithoutUndo<T extends EditorActionNotUndoable> extends EditorActionInterface<T> {
  abstract do(action: T): EditorActionResult;

  undo(action: T): EditorActionResult {
    return {
      requiresMidiUpdate: false,
      requiresRerender: false,
    };
  }

  canUndo(): boolean {
    return false;
  }
}

export default EditorActionWithoutUndo;

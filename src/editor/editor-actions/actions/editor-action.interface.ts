import { EditorActionResult } from '../editor-action-event';

abstract class EditorActionInterface<T> {
    abstract do(action: T): EditorActionResult;

    abstract undo(action: T): EditorActionResult;

    canUndo(): boolean {
      return true;
    }
}

export default EditorActionInterface;

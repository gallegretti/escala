import { EditorActionResult } from '../editor-action-event';

abstract class EditorActionInterface<T> {
  // eslint-disable-next-line no-unused-vars
  abstract do(action: T): EditorActionResult;

  // eslint-disable-next-line no-unused-vars
  abstract undo(action: T): EditorActionResult;

  canUndo(): boolean {
    return true;
  }
}

export default EditorActionInterface;

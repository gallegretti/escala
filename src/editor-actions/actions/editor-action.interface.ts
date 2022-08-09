import { EditorActionResult } from '../editor-action-event';

abstract class EditorActionInterface<T> {
  abstract do(action: T): EditorActionResult;

  abstract undo(action: T): EditorActionResult;

  abstract canUndo(): boolean;
}

export default EditorActionInterface;

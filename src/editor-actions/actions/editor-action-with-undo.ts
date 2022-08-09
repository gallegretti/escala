import { EditorActionResult, EditorActionUndoable } from '../editor-action-event';
import EditorActionInterface from './editor-action.interface';

abstract class EditorActionWithUndo<T extends EditorActionUndoable> extends EditorActionInterface<T> {
  abstract do(action: T): EditorActionResult;

  undo(action: T): EditorActionResult {
    const { previousValue } = action.data;
    if (previousValue === undefined) {
      return {
        requiresMidiUpdate: false,
        requiresRerender: false,
      };
    }
    const params = {
      type: action.type,
      data: {
        ...action.data,
        value: previousValue,
      },
    } as T;
    return this.do(params);
  }

  canUndo(): boolean {
    return true;
  }
}

export default EditorActionWithUndo;

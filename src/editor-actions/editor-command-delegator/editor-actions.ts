/* eslint-disable no-plusplus */
import { EditorActionEvent, EditorActionResult } from '../editor-action-event';
import actionsMapping from './editor-actions-mapping';

export default class EditorActions {
  constructor(private mapping = actionsMapping) {
  }

  public doAction(action: EditorActionEvent): EditorActionResult {
    console.log(action);
    // If a new action is performed and the index is not at the end,
    // invalidate everything after it
    if (this.actionsIndex !== this.actions.length - 1) {
      this.actions = this.actions.slice(this.actionsIndex + 1);
      this.actionsIndex = this.actions.length - 1;
    }

    // Execute the action
    const actionHandler = this.mapping[action.type];
    const result = actionHandler.do(action);

    // And then add this action as the next on the list
    if (actionHandler.canUndo()) {
      this.actions.push(action);
      this.actionsIndex++;
    }

    return result;
  }

  public redoAction(): EditorActionResult {
    const actionToRedo = this.actionToRedo();
    if (!actionToRedo) {
      return {
        requiresRerender: false,
        requiresMidiUpdate: false,
      };
    }
    const actionHandler = this.mapping[actionToRedo.type];
    const result = actionHandler.do(actionToRedo);

    this.actionsIndex++;
    return result;
  }

  public undoAction(): EditorActionResult {
    const actionToUndo = this.actionToUndo();
    if (!actionToUndo) {
      return {
        requiresRerender: false,
        requiresMidiUpdate: false,
      };
    }
    const actionHandler = this.mapping[actionToUndo.type];
    const result = actionHandler.undo(actionToUndo);

    this.actionsIndex--;
    return result;
  }

  public canUndo() {
    return this.actionToUndo() !== undefined;
  }

  public canRedo() {
    return this.actionToRedo() !== undefined;
  }

  public clearUndoAndRedoHistory() {
    this.actionsIndex = -1;
    this.actions = [];
  }

  private actionToRedo() {
    return this.actions[this.actionsIndex + 1];
  }

  private actionToUndo() {
    return this.actions[this.actionsIndex];
  }

  private actions: EditorActionEvent[] = [];

  /**
     * Index is always equal to the last executed action
     */
  private actionsIndex = -1;
}

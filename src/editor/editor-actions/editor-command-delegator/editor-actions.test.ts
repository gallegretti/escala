import { mock } from 'jest-mock-extended';
import EditorActions from './editor-actions';
import { EditorActionEvent } from '../editor-action-event';
import { ScoreInfo } from '../actions/set-score-info/score-info';
import { Note, Score } from '../../../alphatab-types/alphatab-types';

describe('editor-actions', () => {
  test('can undo', () => {
    const editorActions = new EditorActions();
    expect(editorActions.canUndo()).toBe(false);
    editorActions.doAction({ type: 'set-fret', data: { fret: 1, note: mock<Note>() } });
    expect(editorActions.canUndo()).toBe(true);
  });

  test('can redo', () => {
    const editorActions = new EditorActions();
    expect(editorActions.canRedo()).toBe(false);
    editorActions.doAction({ type: 'set-fret', data: { fret: 1, note: mock<Note>() } });
    expect(editorActions.canRedo()).toBe(false);
    editorActions.undoAction();
    expect(editorActions.canRedo()).toBe(true);
  });

  test('don`t allow undoing if the action doesn`t allows it', () => {
    const editorActions = new EditorActions();
    editorActions.doAction({ type: 'set-score-info', data: { score: mock<Score>(), scoreInfo: mock<ScoreInfo>() } });
    expect(editorActions.canUndo()).toBe(false);
  });

  test('do, undo and redo should call the correct action methods', () => {
    const mapping = { 'set-fret': { do: jest.fn(), undo: jest.fn(), canUndo: jest.fn().mockReturnValue(true) } };
    const action: EditorActionEvent = { type: 'set-fret', data: { fret: 1, note: mock<Note>() } };
    const editorActions = new EditorActions(mapping);
    editorActions.doAction(action);
    expect(mapping['set-fret'].do).toHaveBeenNthCalledWith(1, action);
    editorActions.undoAction();
    expect(mapping['set-fret'].undo).toHaveBeenNthCalledWith(1, action);
    editorActions.redoAction();
    expect(mapping['set-fret'].do).toHaveBeenNthCalledWith(2, action);
  });
});

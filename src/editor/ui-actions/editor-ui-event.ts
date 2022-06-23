import { Beat, Note } from '../../alphatab-types/alphatab-types';

interface EditorUIEventNoteMouseDown {
  type: 'note-mouse-down',
  data: {
    note: Note
  }
}

interface EditorUIEventStringDown {
  type: 'string-mouse-down',
  data: {
    stringNumber: number,
    beat: Beat,
  }
}

interface EditorUIEventDeleteSelectedNote {
  type: 'delete-selected-note',
  rawEvent: Event,
  data: Record<string, never>
}

interface EditorUIEventMoveCursorLeft {
  type: 'move-cursor-left',
  rawEvent: Event,
  data: Record<string, never>
}

interface EditorUIEventMoveCursorRight {
  type: 'move-cursor-right',
  rawEvent: Event,
  data: Record<string, never>
}

interface EditorUIEventMoveCursorUp {
  type: 'move-cursor-up',
  rawEvent: Event,
  data: Record<string, never>
}

interface EditorUIEventMoveCursorDown {
  type: 'move-cursor-down',
  rawEvent: Event,
  data: Record<string, never>
}

interface EditorUIEventDeselectCursor {
  type: 'deselect-cursor',
  rawEvent: Event,
  data: Record<string, never>
}

interface EditorUIEventUndoAction {
  type: 'undo-action',
  rawEvent: Event,
  data: Record<string, never>
}

interface EditorUIEventRedoAction {
  type: 'redo-action',
  rawEvent: Event,
  data: Record<string, never>
}

export type EditorUIEvent =
  EditorUIEventNoteMouseDown |
  EditorUIEventStringDown |
  EditorUIEventDeleteSelectedNote |
  EditorUIEventMoveCursorLeft |
  EditorUIEventMoveCursorRight |
  EditorUIEventMoveCursorUp |
  EditorUIEventMoveCursorDown |
  EditorUIEventDeselectCursor |
  EditorUIEventUndoAction |
  EditorUIEventRedoAction;

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
    data: {}
}

interface EditorUIEventMoveCursorLeft {
    type: 'move-cursor-left',
    rawEvent: Event,
    data: {}
}

interface EditorUIEventMoveCursorRight {
    type: 'move-cursor-right',
    rawEvent: Event,
    data: {}
}

interface EditorUIEventMoveCursorUp {
    type: 'move-cursor-up',
    rawEvent: Event,
    data: {}
}

interface EditorUIEventMoveCursorDown {
    type: 'move-cursor-down',
    rawEvent: Event,
    data: {}
}

interface EditorUIEventDeselectCursor {
    type: 'deselect-cursor',
    rawEvent: Event,
    data: {}
}

interface EditorUIEventUndoAction {
    type: 'undo-action',
    rawEvent: Event,
    data: {}
}

interface EditorUIEventRedoAction {
    type: 'redo-action',
    rawEvent: Event,
    data: {}
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

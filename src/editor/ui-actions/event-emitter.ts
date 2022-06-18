import { Bounds, ScoreRenderer } from '../../alphatab-types/alphatab-types';
import { EditorUIEvent } from './editor-ui-event';

const callbacks: ((arg: EditorUIEvent) => any)[] = [];

function emitEvent(event: EditorUIEvent) {
  callbacks.forEach((callback) => callback(event));
}

function getStringNumber(y: number, barBounds: Bounds) {
  // TODO: Add padding around first and last frets
  const fretH = barBounds.h / 6;
  if (y > barBounds.y && y < barBounds.y + fretH * 1) {
    return 6;
  }
  if (y > barBounds.y && y < barBounds.y + fretH * 2) {
    return 5;
  }
  if (y > barBounds.y && y < barBounds.y + fretH * 3) {
    return 4;
  }
  if (y > barBounds.y && y < barBounds.y + fretH * 4) {
    return 3;
  }
  if (y > barBounds.y && y < barBounds.y + fretH * 5) {
    return 2;
  }
  if (y > barBounds.y && y < barBounds.y + fretH * 6) {
    return 1;
  }
  return null;
}

function setupListeners(renderer: ScoreRenderer) {
  $(window).on('alphaTab.beatMouseDown', (event, beat) => {
    const containerOffset = $('#alphaTab').offset();
    if (containerOffset === undefined) {
      return;
    }
    const x = (window.event as any).pageX - containerOffset.left;
    const y = (window.event as any).pageY - containerOffset.top;
    const note = renderer?.boundsLookup?.getNoteAtPos(beat, x, y);
    if (note) {
      emitEvent({
        type: 'note-mouse-down',
        data: {
          note,
        },
      });
      return;
    }
    const barBounds = renderer?.boundsLookup?.findBeat(beat)?.barBounds.visualBounds;
    const stringNumber = getStringNumber(y, barBounds!);
    if (stringNumber) {
      emitEvent({
        type: 'string-mouse-down',
        data: {
          stringNumber,
          beat,
        },
      });
    }
  });

  document.addEventListener('keydown', (event: any) => {
    console.log(event);
    if (event.type === 'keydown' && event.key === 'Delete') {
      emitEvent({
        type: 'delete-selected-note',
        rawEvent: event,
        data: {},
      });
    }
    if (event.type === 'keydown' && event.key === 'ArrowLeft') {
      emitEvent({
        type: 'move-cursor-left',
        rawEvent: event,
        data: {},
      });
    }
    if (event.type === 'keydown' && event.key === 'ArrowRight') {
      emitEvent({
        type: 'move-cursor-right',
        rawEvent: event,
        data: {},
      });
    }
    if (event.type === 'keydown' && event.key === 'ArrowUp') {
      emitEvent({
        type: 'move-cursor-up',
        rawEvent: event,
        data: {},
      });
    }
    if (event.type === 'keydown' && event.key === 'ArrowDown') {
      emitEvent({
        type: 'move-cursor-down',
        rawEvent: event,
        data: {},
      });
    }
    if (event.type === 'keydown' && event.key === 'Escape') {
      emitEvent({
        type: 'deselect-cursor',
        rawEvent: event,
        data: {},
      });
    }
    if (event.ctrlKey === true && event.key === 'z') {
      emitEvent({
        type: 'undo-action',
        rawEvent: event,
        data: {},
      });
    }
    if (event.ctrlKey === true && event.key === 'y') {
      emitEvent({
        type: 'redo-action',
        rawEvent: event,
        data: {},
      });
    }
  });
}

export default class EventEmitter {
  constructor(renderer: ScoreRenderer, callback: (arg: EditorUIEvent) => any) {
    setupListeners(renderer);
    callbacks.push(callback);
  }
}

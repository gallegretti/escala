import React, { useCallback } from 'react';
import { useTheme } from '@mui/material';
import { Bounds } from '../../alphatab-types/alphatab-types';

interface EditorCursorProps {
    bounds?: Bounds
    fret: number | null;
    setFret: (fret: number) => void;
    onFocusOut: () => void;
    hasDialogOpen: boolean;
}

const padding = 2;

const newFretFromInput = (currentFret: number | null, newInput: number) => {
  if (currentFret === null) {
    return newInput;
  }
  let newFret;
  if (currentFret >= 0 && currentFret <= 9) {
    newFret = (currentFret * 10) + newInput;
  } else {
    newFret = newInput;
  }
  if (newFret >= 30) {
    newFret = newInput;
  }
  return newFret;
};

export function EditorCursor(props: EditorCursorProps) {
  const theme = useTheme();

  const refocusCallback = useCallback((e: any) => {
    setTimeout(() => {
      e.target.focus();
    }, 10);
  }, []);

  const inputRef = useCallback((node: any) => {
    // Always refocus the input if there's no open dialog in the app
    if (node) {
      node.removeEventListener('focusout', refocusCallback);
      if (!props.hasDialogOpen) {
        node.addEventListener('focusout', refocusCallback);
      }
    }
  }, [props.hasDialogOpen, refocusCallback]);

  if (!props.bounds) {
    return <div />;
  }
  return (
    <div
      id="editor-cursor"
      style={{
        position: 'absolute',
        borderStyle: 'solid',
        borderWidth: '1px',
        borderColor: `${theme.palette.mode === 'dark' ? 'white' : 'black'}`,
        left: `${props.bounds.x - padding}px`,
        top: `${props.bounds.y - padding}px`,
        zIndex: 1000,
        width: `${props.bounds.w + padding * 2}px`,
        height: `${props.bounds.h + padding * 2}px`,
        pointerEvents: 'none',
      }}
    >
      <input
        ref={inputRef}
        style={{ width: '10px', appearance: 'textfield', opacity: '0' }}
        autoFocus
        type="number"
        onChange={(e) => {
          const newInput = Number.parseInt(e.target.value[e.target.value.length - 1]);
          props.setFret(newFretFromInput(props.fret, newInput));
        }}
      />
    </div>
  );
}

import React from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@mui/material';

interface ChordNoteProps {
  fret: number;
  string: number;
  isSelected: boolean;
  noteClick: (fret: number, string: number) => void;
}

export default function ChordNote({
  fret,
  string,
  isSelected,
  noteClick,
}: ChordNoteProps) {
  const theme = useTheme();
  const Note = styled('div')({
    opacity: isSelected ? '1 !important' : '0',
    cursor: 'pointer',
    width: '20px',
    height: '20px',
    backgroundColor: theme.palette.text.primary,
    gridColumnStart: 1 + string * 2,
    gridRowStart: 2 + (fret - 1) * 2, // 1 -> 2, 2 -> 4, 3 -> 6, ...
    borderRadius: '50%',
    placeSelf: 'center',
    '&:focus': {
      opacity: '0.5',
    },
    '&:hover': {
      opacity: '0.5',
    },
  });
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <Note
      // eslint-disable-next-line react/no-array-index-key
      id={`fret-${fret}-string-${string}`}
      aria-label={`fret ${fret} string ${string}`}
      onClick={() => noteClick(fret, string)}
      role="button"
      tabIndex={0}
    />
  );
}

import { useTheme } from '@mui/material';
import React from 'react';
import ChordNote from './chord-note';

interface ChordGridProps {
  numberOfFrets: number,
  numberOfStrings: number,
  strings: number[],
  noteClick: (fret: number, string: number) => void
}

export default function ChordGrid({
  numberOfFrets,
  numberOfStrings,
  strings,
  noteClick,
}: ChordGridProps) {
  const theme = useTheme();
  return (
    <div style={{
      position: 'absolute',
      display: 'grid',
      gridTemplateRows: `repeat(${numberOfFrets - 1}, 5px 1fr) 5px`,
      gridTemplateColumns: `repeat(${numberOfStrings - 1}, 5px 1fr) 5px`,
      backgroundColor: 'white',
      width: '100%',
      top: '0',
      height: '100%',
    }}
    >
      {
        [...Array(numberOfFrets - 1)].map((_, fret) => (
          [...Array(numberOfStrings)].map((_2, string) => (
            (
              <>
                <div style={{
                  backgroundColor: theme.palette.mode === 'dark' ? 'rgb(56 56 56)' : 'white',
                  gridColumnStart: 2 + string * 2,
                  gridRowStart: 2 + fret * 2,
                }}
                />
                <ChordNote
                  key={`${fret + 1}-${string + 1}`}
                  fret={fret}
                  string={string}
                  isSelected={strings[string] === fret}
                  noteClick={noteClick}
                />
              </>
            )))
        ))
      }
    </div>
  );
}

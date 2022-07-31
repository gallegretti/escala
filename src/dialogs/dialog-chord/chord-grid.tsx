import React from 'react';
import { useTheme } from '@mui/material';
import { range } from 'lodash';
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
  const stringWidth = '5px';
  const fretWidth = '5px';
  return (
    <div style={{
      position: 'absolute',
      display: 'grid',
      gridTemplateRows: `repeat(${numberOfFrets - 1}, ${fretWidth} 1fr) ${fretWidth}`,
      gridTemplateColumns: `repeat(${numberOfStrings - 1}, ${stringWidth} 1fr) ${stringWidth}`,
      backgroundColor: theme.palette.text.primary,
      width: '100%',
      top: '0',
      height: '100%',
    }}
    >
      {
        range(1, numberOfFrets).map((fret, fretIndex) => (
          range(numberOfStrings).map((string, stringIndex) => (
            (
              <React.Fragment key={`${fret}-${string}`}>
                <div style={{
                  backgroundColor: theme.palette.mode === 'dark' ? 'rgb(56 56 56)' : 'white',
                  gridColumnStart: 2 + stringIndex * 2,
                  gridRowStart: 2 + fretIndex * 2,
                }}
                />
                <ChordNote
                  key={`${fretIndex + 1}-${stringIndex + 1}`}
                  fret={fret}
                  string={stringIndex}
                  isSelected={strings[stringIndex] === fret}
                  noteClick={noteClick}
                />
              </React.Fragment>
            )))
        ))
      }
    </div>
  );
}

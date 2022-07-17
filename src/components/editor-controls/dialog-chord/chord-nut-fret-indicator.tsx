/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { range } from 'lodash';

interface ChordNutProps {
  numberOfStrings: number;
  strings: number[];
  noteClick: (fret: number, string: number) => void;
}

export default function ChordNutFretIndicator({ numberOfStrings, strings, noteClick }: ChordNutProps) {
  const stringNutSymbol = (stringValue: number) => {
    if (stringValue === -1) {
      return 'X';
    }
    if (stringValue === 0) {
      return 'O';
    }
    return '';
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      maxWidth: '100%',
      marginRight: '12px',
      marginLeft: '12px',
    }}
    >
      {
        range(numberOfStrings).map((i) => (
          <div
            style={{
              width: '20px',
              fontSize: '28px',
              cursor: 'pointer',
            }}
            key={i}
            onClick={() => {
              if (strings[i] === 0) {
                noteClick(-1, i);
              } else {
                noteClick(0, i);
              }
            }}
          >
            {stringNutSymbol(strings[i])}
          </div>
        ))
      }
    </div>
  );
}

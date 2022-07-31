import React from 'react';
import ChordFirstFretInput from './chord-first-fret-input';
import ChordGrid from './chord-grid';
import ChordNut from './chord-nut';
import ChordNutFretIndicator from './chord-nut-fret-indicator';

const fretNotPlayed = -1;

interface ChordInputProps {
  strings: number[];
  setStrings: (arg: number[]) => void;
  numberOfStrings: number;
  numberOfFrets: number;
  firstFret: number;
  setFirstFret: (arg: number) => void
}

export default function ChordInput(props: ChordInputProps) {
  const noteClick = (fret: number, string: number) => {
    const newStrings = [...props.strings];
    if (newStrings[string] === fret) {
      newStrings[string] = fretNotPlayed;
    } else {
      newStrings[string] = fret;
    }
    props.setStrings(newStrings);
  };

  return (
    <>
      <ChordNutFretIndicator
        noteClick={noteClick}
        numberOfStrings={props.numberOfStrings}
        strings={props.strings}
      />
      <div style={{
        position: 'relative',
        width: '85%',
        height: '300px',
        margin: 'auto',
      }}
      >
        <ChordFirstFretInput
          setFirstFret={props.setFirstFret}
          firstFret={props.firstFret}
        />
        <ChordNut />
        <ChordGrid
          noteClick={noteClick}
          numberOfFrets={props.numberOfFrets}
          numberOfStrings={props.numberOfStrings}
          strings={props.strings}
        />
      </div>
    </>
  );
}

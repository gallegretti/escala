import React from 'react';
import { Divider } from '@mui/material';
import TextGlyph from '../icons/beat/text';
import UpstrokeGlyph from '../icons/beat/upstroke';
import DownStrokeGlyph from '../icons/beat/downstroke';
import { Chord, PickStroke } from '../../../alphatab-types/alphatab-types';
import ChordButton from '../components/chord-button';

interface BeatSectionProps {
  currentPickStroke: number | null,
  setPickStroke: (stroke: number) => void,
  hasSelectedBeat: boolean,
  setText: () => void,
  setChord: () => void,
  useChord: (arg: Chord) => void,
  chords: Chord[],
}

export default function BeatSection(props: BeatSectionProps) {
  const setPickStroke = (newPickStroke: PickStroke) => {
    if (props.currentPickStroke === newPickStroke) {
      props.setPickStroke(alphaTab.model.PickStroke.None);
    } else {
      props.setPickStroke(newPickStroke);
    }
  };

  return (
    <>
      <TextGlyph
        disabled={!props.hasSelectedBeat}
        selected={false}
        onClick={() => {
          if (props.hasSelectedBeat) {
            props.setText();
          }
        }}
      />
      <Divider variant="middle" orientation="vertical" flexItem />
      <UpstrokeGlyph
        disabled={!props.hasSelectedBeat}
        selected={props.currentPickStroke === alphaTab.model.PickStroke.Up}
        onClick={() => setPickStroke(alphaTab.model.PickStroke.Up)}
      />
      <DownStrokeGlyph
        disabled={!props.hasSelectedBeat}
        selected={props.currentPickStroke === alphaTab.model.PickStroke.Down}
        onClick={() => setPickStroke(alphaTab.model.PickStroke.Down)}
      />
      <Divider variant="middle" orientation="vertical" flexItem />
      <ChordButton
        disabled={!props.hasSelectedBeat}
        chords={props.chords}
        setChord={props.setChord}
        useChord={props.useChord}
      />
    </>
  );
}

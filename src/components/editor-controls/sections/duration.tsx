import React from 'react';
import { Divider } from '@mui/material';
import WholeGlyph from '../icons/duration/whole';
import HalfGlyph from '../icons/duration/half';
import QuarterGlyph from '../icons/duration/quarter';
import EighthGlyph from '../icons/duration/eighth';
import SixTeenthGlyph from '../icons/duration/sixteenth';
import ThirtySecondGlyph from '../icons/duration/thirty-second';
import SixtyFourGlyph from '../icons/duration/sixty-four';
import Tie from '../icons/duration/tie';
import { Duration } from '../../../alphatab-types/alphatab-types';

interface DurationSectionProps {
  hasSelectedNote: boolean;
  currentDuration: Duration | null;
  setDuration: (duration: Duration) => void;
  setTie: (tie: boolean) => void;
  isTie: boolean;
}

export default function DurationSetion(props: DurationSectionProps) {
  return (
    <>
      <WholeGlyph
        disabled={!props.hasSelectedNote}
        selected={props.currentDuration === alphaTab.model.Duration.Whole}
        onClick={() => props.setDuration(alphaTab.model.Duration.Whole)}
      />
      <HalfGlyph
        disabled={!props.hasSelectedNote}
        selected={props.currentDuration === alphaTab.model.Duration.Half}
        onClick={() => props.setDuration(alphaTab.model.Duration.Half)}
      />
      <QuarterGlyph
        disabled={!props.hasSelectedNote}
        selected={props.currentDuration === alphaTab.model.Duration.Quarter}
        onClick={() => props.setDuration(alphaTab.model.Duration.Quarter)}
      />
      <EighthGlyph
        disabled={!props.hasSelectedNote}
        selected={props.currentDuration === alphaTab.model.Duration.Eighth}
        onClick={() => props.setDuration(alphaTab.model.Duration.Eighth)}
      />
      <SixTeenthGlyph
        disabled={!props.hasSelectedNote}
        selected={props.currentDuration === alphaTab.model.Duration.Sixteenth}
        onClick={() => props.setDuration(alphaTab.model.Duration.Sixteenth)}
      />
      <ThirtySecondGlyph
        disabled={!props.hasSelectedNote}
        selected={props.currentDuration === alphaTab.model.Duration.ThirtySecond}
        onClick={() => props.setDuration(alphaTab.model.Duration.ThirtySecond)}
      />
      <SixtyFourGlyph
        disabled={!props.hasSelectedNote}
        selected={props.currentDuration === alphaTab.model.Duration.SixtyFourth}
        onClick={() => props.setDuration(alphaTab.model.Duration.SixtyFourth)}
      />
      <Divider variant="middle" orientation="vertical" flexItem />
      <Tie
        disabled={!props.hasSelectedNote}
        onClick={() => props.setTie(!props.isTie)}
        selected={props.isTie}
      />
    </>
  );
}

import React from 'react';
import FullPreBendGlyph from '@glyphs/effects/bend/full-pre-bend';
import HalfPreBendGlyph from '@glyphs/effects/bend/half-pre-bend';
import PreBendGlyph from '@glyphs/effects/bend/pre-bend';
import QuarterPreBendGlyph from '@glyphs/effects/bend/quarter-pre-bend';
import { BendType } from '../../alphatab-types/bend-type';
import GenericBendButton from './generic-bend-button';

interface PreBendButtonProps {
  preBend: BendType;
  setPreBend: (bendType: BendType) => void;
  disabled: boolean;
  isPopperOpen: boolean;
  setPopperOpen: () => void;
}

export default function PreBendButton(props: PreBendButtonProps) {
  return (
    <GenericBendButton
      currentBendType={props.preBend}
      setPopperOpen={props.setPopperOpen}
      default={PreBendGlyph}
      quarter={QuarterPreBendGlyph}
      half={HalfPreBendGlyph}
      full={FullPreBendGlyph}
      disabled={props.disabled}
      isPopperOpen={props.isPopperOpen}
      setCurrentBendType={props.setPreBend}
    />
  );
}

import React from 'react';
import BendGlyph from '@glyphs/effects/bend/bend';
import FullBendGlyph from '@glyphs/effects/bend/full-bend';
import HalfBendGlyph from '@glyphs/effects/bend/half-bend';
import { BendType } from '../../alphatab-types/bend-type';
import GenericBendButton from './generic-bend-button';

interface BendPartProps {
  bend: BendType;
  setBend: (bendType: BendType) => void;
  disabled: boolean;
  isPopperOpen: boolean;
  setPopperOpen: () => void;
}

export default function BendPart(props: BendPartProps) {
  return (
    <GenericBendButton
      currentBendType={props.bend}
      setPopperOpen={props.setPopperOpen}
      default={BendGlyph}
      half={HalfBendGlyph}
      full={FullBendGlyph}
      disabled={props.disabled}
      isPopperOpen={props.isPopperOpen}
      setCurrentBendType={props.setBend}
    />
  );
}

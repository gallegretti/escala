import React from 'react';
import { BendGlyph } from '../../icons/effects/bend/bend';
import { FullBendGlyph } from '../../icons/effects/bend/full-bend';
import { HalfBendGlyph } from '../../icons/effects/bend/half-bend';
import { BendType } from '../../../../editor/bend-type';
import GenericBendButton from './generic-bend-button';

interface BendButtonProps {
    hasSelectedNote: boolean;
    bend: BendType;
    setBend: (bendType: BendType) => void;
    disabled: boolean;
    isPopperOpen: boolean;
    setPopperOpen: () => void;
}

export default function BendButton(props: BendButtonProps) {
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

import React from 'react';
import { FullPreBendGlyph } from '../../icons/effects/bend/full-pre-bend';
import { HalfPreBendGlyph } from '../../icons/effects/bend/half-pre-bend';
import PreBendGlyph from '../../icons/effects/bend/pre-bend';
import { BendType } from '../../../../editor/bend-type';
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
      half={HalfPreBendGlyph}
      full={FullPreBendGlyph}
      disabled={props.disabled}
      isPopperOpen={props.isPopperOpen}
      setCurrentBendType={props.setPreBend}
    />
  );
}

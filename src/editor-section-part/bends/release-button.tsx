import React from 'react';
import ReleaseBendGlyph from '@glyphs/effects/bend/release-bend';
import HalfReleaseBendGlyph from '@glyphs/effects/bend/half-release-bend';
import FullReleaseBendGlyph from '@glyphs/effects/bend/full-release-bend';
import QuarterReleaseBendGlyph from '@glyphs/effects/bend/quarter-release-bend';
import { BendType } from '../../alphatab-types/bend-type';
import GenericBendButton from './generic-bend-button';

interface ReleaseButtonProps {
  release: BendType;
  setRelease: (bendType: BendType) => void;
  disabled: boolean;
  isPopperOpen: boolean;
  setPopperOpen: () => void;
}

export default function ReleaseBendButton(props: ReleaseButtonProps) {
  return (
    <GenericBendButton
      currentBendType={props.release}
      setPopperOpen={props.setPopperOpen}
      default={ReleaseBendGlyph}
      quarter={QuarterReleaseBendGlyph}
      half={HalfReleaseBendGlyph}
      full={FullReleaseBendGlyph}
      disabled={props.disabled}
      isPopperOpen={props.isPopperOpen}
      setCurrentBendType={props.setRelease}
    />
  );
}

import React from 'react';
import { DynamicGlyphProps } from '../../dynamics/dynamic';
import GenericHarmonicGlyph from './generic-harmonic';

export default function NaturalHarmonicGlyph(props: DynamicGlyphProps) {
  return (
    <GenericHarmonicGlyph {...props} title="Natural Harmonic">
      N.H
    </GenericHarmonicGlyph>
  );
}

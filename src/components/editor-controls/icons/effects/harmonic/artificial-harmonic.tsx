import React from 'react';
import { DynamicGlyphProps } from '../../dynamics/dynamic';
import GenericHarmonicGlyph from './generic-harmonic';

export default function ArtificialHarmonicGlyph(props: DynamicGlyphProps) {
  return (
    <GenericHarmonicGlyph {...props} title="Artificial Harmonic">
      A.H
    </GenericHarmonicGlyph>
  );
}

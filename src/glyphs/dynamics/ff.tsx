import React from 'react';
import { DynamicGlyphProps } from './dynamic';
import GenericDynamicGlyph from './generic-dynamic';

export default function FortissimoGlyph(props: DynamicGlyphProps) {
  return (
    <GenericDynamicGlyph width="25px" title="Fortissimo" {...props}></GenericDynamicGlyph>
  );
}

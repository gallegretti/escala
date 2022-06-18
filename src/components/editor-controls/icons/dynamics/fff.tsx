import React from 'react';
import { DynamicGlyphProps } from './dynamic';
import { GenericDynamicGlyph } from './generic-dynamic';

export function ForteFortissimoGlyph(props: DynamicGlyphProps) {
  return (
    <GenericDynamicGlyph width="30px" title="Forte Fortissimo" {...props}></GenericDynamicGlyph>
  );
}

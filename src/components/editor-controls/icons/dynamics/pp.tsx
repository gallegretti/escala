import React from 'react';
import { DynamicGlyphProps } from './dynamic';
import GenericDynamicGlyph from './generic-dynamic';

export default function PianissimoGlyph(props: DynamicGlyphProps) {
  return (
    <GenericDynamicGlyph width="27px" title="Pianissimo" {...props}></GenericDynamicGlyph>
  );
}

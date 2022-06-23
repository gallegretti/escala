import React from 'react';
import { DynamicGlyphProps } from './dynamic';
import GenericDynamicGlyph from './generic-dynamic';

export default function ForteGlyph(props: DynamicGlyphProps) {
  return (
    <GenericDynamicGlyph width="18px" title="Forte" {...props}></GenericDynamicGlyph>
  );
}

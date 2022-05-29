import React from 'react';
import { DynamicGlyphProps } from './dynamic';
import { GenericDynamicGlyph } from './generic-dynamic';

export function PianoGlyph(props: DynamicGlyphProps) {
    return (
        <GenericDynamicGlyph width="15px" title="Piano" {...props}></GenericDynamicGlyph>
    );
}
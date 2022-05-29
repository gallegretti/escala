import React from 'react';
import { DynamicGlyphProps } from '../../dynamics/dynamic';
import { GenericHarmonicGlyph } from './generic-harmonic';

export function TapHarmonicGlyph(props: DynamicGlyphProps) {
    return (
        <GenericHarmonicGlyph {...props} title="Tap Harmonic">
            T.H
        </GenericHarmonicGlyph>
    );
}
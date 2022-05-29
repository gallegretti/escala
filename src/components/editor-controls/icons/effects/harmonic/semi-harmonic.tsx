import React from 'react';
import { DynamicGlyphProps } from '../../dynamics/dynamic';
import { GenericHarmonicGlyph } from './generic-harmonic';

export function SemiHarmonicGlyph(props: DynamicGlyphProps) {
    return (
        <GenericHarmonicGlyph {...props} title="Semi Harmonic">
            S.H
        </GenericHarmonicGlyph>
    );
}
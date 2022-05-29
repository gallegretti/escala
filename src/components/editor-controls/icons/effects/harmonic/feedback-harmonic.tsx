import React from 'react';
import { DynamicGlyphProps } from '../../dynamics/dynamic';
import { GenericHarmonicGlyph } from './generic-harmonic';

export function FeedbackHarmonicGlyph(props: DynamicGlyphProps) {
    return (
        <GenericHarmonicGlyph {...props} title="Feedback Harmonic">
            F.H
        </GenericHarmonicGlyph>
    );
}
import React from 'react';
import { useTranslation } from 'react-i18next';
import { DynamicGlyphProps } from '../../dynamics/dynamic';
import GenericHarmonicGlyph from './generic-harmonic';

export default function FeedbackHarmonicGlyph(props: DynamicGlyphProps) {
  const { t } = useTranslation();
  return (
    <GenericHarmonicGlyph {...props} title={t('Feedback Harmonic')}>
      F.H
    </GenericHarmonicGlyph>
  );
}

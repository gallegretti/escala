import React from 'react';
import { useTranslation } from 'react-i18next';
import { DynamicGlyphProps } from '../../dynamics/dynamic';
import GenericHarmonicGlyph from './generic-harmonic';

export default function TapHarmonicGlyph(props: DynamicGlyphProps) {
  const { t } = useTranslation();
  return (
    <GenericHarmonicGlyph {...props} title={t('Tap Harmonic')}>
      T.H
    </GenericHarmonicGlyph>
  );
}

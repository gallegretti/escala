/* eslint-disable max-len */
import React from 'react';
import { Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { DynamicGlyphProps } from '../dynamics/dynamic';
import { useGlyphColor } from '../glyphColor';
import baseSvgStyle from '../glyphBaseSvgStyle';

export default function MetronomeGlyph(props: DynamicGlyphProps) {
  const color = useGlyphColor(props);
  const { t } = useTranslation();
  return (
    <Tooltip title={t('Metronome')}>
      <svg xmlns="http://www.w3.org/2000/svg" fill={color} height="20px" viewBox="0 0 18 18" width="20px" onClick={props.onClick} style={baseSvgStyle(props)}>
        <path d="M 0 18 q 2.5 -9 5 -17 Q 6 0 9 0 Q 12 0 13 1 L 18 18 L 16 18 L 12 2 L 6 2 L 2 18 M 10 17 L 2 4 L 3 3 L 11 16 Z M 2 18 L 2 16 L 16 16 L 16 18" />
      </svg>
    </Tooltip>
  );
}

/* eslint-disable max-len */
import React from 'react';
import { Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { DynamicGlyphProps } from '../dynamics/dynamic';
import { useGlyphColor } from '../glyphColor';
import baseSvgStyle from '../glyphBaseSvgStyle';

export default function RepeatGlyph(props: DynamicGlyphProps) {
  const color = useGlyphColor(props);
  const { t } = useTranslation();
  // https://fonts.google.com/icons?selected=Material%20Icons%3Arepeat%3A
  return (
    <Tooltip title={t('Repeat')}>
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill={color} onClick={props.onClick} style={baseSvgStyle(props)}>
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z" />
      </svg>
    </Tooltip>
  );
}

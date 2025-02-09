/* eslint-disable max-len */
import React from 'react';
import { Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { DynamicGlyphProps } from '../dynamics/dynamic';
import { useGlyphColor } from '../glyphColor';
import baseSvgStyle from '../glyphBaseSvgStyle';

export default function AudioMixerGlyph(props: DynamicGlyphProps) {
  const color = useGlyphColor(props);
  const { t } = useTranslation();
  return (
    <Tooltip title={t('Audio Mixer')}>
      <svg onClick={props.onClick} style={baseSvgStyle(props)} height="28px" width="28px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 64 64" xmlSpace="preserve">
        <line fill="none" stroke={color} stroke-width="2" stroke-miterlimit="10" x1="12" y1="19" x2="12" y2="64" />
        <line fill="none" stroke={color} stroke-width="2" stroke-miterlimit="10" x1="52" y1="0" x2="52" y2="45" />
        <line fill="none" stroke={color} stroke-width="2" stroke-miterlimit="10" x1="32" y1="38" x2="32" y2="64" />
        <line fill="none" stroke={color} stroke-width="2" stroke-miterlimit="10" x1="32" y1="0" x2="32" y2="26" />
        <circle fill="none" stroke={color} stroke-width="2" stroke-miterlimit="10" cx="12" cy="13" r="6" />
        <circle fill="none" stroke={color} stroke-width="2" stroke-miterlimit="10" cx="52" cy="51" r="6" />
        <circle fill="none" stroke={color} stroke-width="2" stroke-miterlimit="10" cx="32" cy="32" r="6" />
        <line fill="none" stroke={color} stroke-width="2" stroke-miterlimit="10" x1="12" y1="0" x2="12" y2="7" />
        <line fill="none" stroke={color} stroke-width="2" stroke-miterlimit="10" x1="52" y1="57" x2="52" y2="64" />
      </svg>
    </Tooltip>
  );
}

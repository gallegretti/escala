import React from 'react';
import { Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { DurationGlyphProps } from './duration';
import { useGlyphColor } from '../glyphColor';
import genericDurationFontSize from './generic-duration';
import baseSvgStyle from '../glyphBaseSvgStyle';

export default function Tie(props: DurationGlyphProps) {
  const color = useGlyphColor(props);
  const { t } = useTranslation();
  return (
    <Tooltip title={t('Tied Note')}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        onClick={props.onClick}
        height="35px"
        width="25px"
        style={baseSvgStyle(props)}
      >
        <path d="M7,6 L7,27" stroke={color} strokeWidth="0.96" style={{ fill: 'none' }} />
        <path d="M 19 29 C 18 33 10 33 9 29" stroke={color} strokeWidth="1.5" style={{ fill: 'none' }} />
        <text fill={color} style={{ transform: 'translate(0px, 29px)', fontSize: genericDurationFontSize }}></text>
      </svg>
    </Tooltip>
  );
}

import React from 'react';
import { Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { DynamicGlyphProps } from '../dynamics/dynamic';
import { useGlyphColor } from '../glyphColor';
import baseSvgStyle from '../glyphBaseSvgStyle';

export default function DownStrokeGlyph(props: DynamicGlyphProps) {
  const color = useGlyphColor(props);
  const { t } = useTranslation();
  return (
    <Tooltip title={t('Downstroke')}>
      <svg
        height="20px"
        width="18px"
        onClick={props.onClick}
        xmlns="http://www.w3.org/2000/svg"
        style={baseSvgStyle(props)}
      >
        <text fill={color} style={{ transform: 'translate(4px, 16px)', fontSize: '35px' }}></text>
      </svg>
    </Tooltip>
  );
}

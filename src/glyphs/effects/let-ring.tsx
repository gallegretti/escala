import React from 'react';
import { Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { DynamicGlyphProps } from '../dynamics/dynamic';
import { useGlyphColor } from '../glyphColor';
import baseSvgStyle from '../glyphBaseSvgStyle';
import { glyphAsciFontfamily } from '../glyphTextFont';

export default function LetRingGlyph(props: DynamicGlyphProps) {
  const color = useGlyphColor(props);
  const { t } = useTranslation();
  return (
    <Tooltip title={t('Let Ring')}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="20px"
        width="34px"
        onClick={props.onClick}
        style={baseSvgStyle(props)}
      >
        <text
          fill={color}
          style={{ fontSize: '16px', fontFamily: glyphAsciFontfamily, transform: 'translate(4px, 16px)' }}
        >
          {t('L.R')}
        </text>
      </svg>
    </Tooltip>
  );
}

import React from 'react';
import { Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { DynamicGlyphProps } from '../dynamics/dynamic';
import { useGlyphColor } from '../glyphColor';
import baseSvgStyle from '../glyphBaseSvgStyle';
import { glyphAsciFontfamily } from '../glyphTextFont';

export default function TextGlyph(props: DynamicGlyphProps) {
  const color = useGlyphColor(props);
  const { t } = useTranslation();
  return (
    <Tooltip title={t('Set text')}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="20px"
        width="50px"
        onClick={props.onClick}
        style={baseSvgStyle(props)}
      >
        <text
          fill={color}
          style={{ transform: 'translate(4px, 16px)', fontFamily: glyphAsciFontfamily, fontSize: '20px' }}
        >
          {t('Text')}
        </text>
      </svg>
    </Tooltip>
  );
}

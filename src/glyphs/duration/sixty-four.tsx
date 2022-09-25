import React from 'react';
import { Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { DurationGlyphProps } from './duration';
import { useGlyphColor } from '../glyphColor';
import baseSvgStyle from '../glyphBaseSvgStyle';
import genericDurationFontSize from './generic-duration';

export default function SixtyFourGlyph(props: DurationGlyphProps) {
  const color = useGlyphColor(props);
  const { t } = useTranslation();
  return (
    <Tooltip title={t('Sixty-Fourth')}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        onClick={props.onClick}
        height="35px"
        width="16px"
        style={baseSvgStyle(props)}
      >
        <text fill={color} style={{ transform: 'translate(0px, 29px)', fontSize: genericDurationFontSize }}>
          {
            // https://w3c.github.io/smufl/latest/tables/individual-notes.html
            '\uE1DD'
          }
        </text>
      </svg>
    </Tooltip>
  );
}

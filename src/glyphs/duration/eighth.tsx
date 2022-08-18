import React from 'react';
import { Tooltip } from '@mui/material';
import { DurationGlyphProps } from './duration';
import { useGlyphColor } from '../glyphColor';
import genericDurationFontSize from './generic-duration';
import baseSvgStyle from '../glyphBaseSvgStyle';

export default function EighthGlyph(props: DurationGlyphProps) {
  const color = useGlyphColor(props);
  return (
    <Tooltip title="Eighth">
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
            '\uE1D7'
          }
        </text>
      </svg>
    </Tooltip>
  );
}

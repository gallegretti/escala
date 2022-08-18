import React from 'react';
import { Tooltip } from '@mui/material';
import { DurationGlyphProps } from './duration';
import { useGlyphColor } from '../glyphColor';
import baseSvgStyle from '../glyphBaseSvgStyle';
import genericDurationFontSize from './generic-duration';

export default function WholeGlyph(props: DurationGlyphProps) {
  const color = useGlyphColor(props);
  return (
    <Tooltip title="Whole">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        onClick={props.onClick}
        height="35px"
        width="12px"
        style={baseSvgStyle(props)}
      >
        <text fill={color} style={{ transform: 'translate(0px, 29px)', fontSize: genericDurationFontSize }}>
          {
            // https://w3c.github.io/smufl/latest/tables/individual-notes.html
            '\uE1D2'
          }
        </text>
      </svg>
    </Tooltip>
  );
}

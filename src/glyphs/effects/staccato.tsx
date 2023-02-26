import React from 'react';
import { Tooltip } from '@mui/material';
import { DynamicGlyphProps } from '@glyphs/dynamics/dynamic';
import genericDurationFontSize from '@glyphs/duration/generic-duration';
import { useGlyphColor } from '../glyphColor';
import baseSvgStyle from '../glyphBaseSvgStyle';

export default function StaccatoGlyph(props: DynamicGlyphProps) {
  const color = useGlyphColor(props);
  return (
    <Tooltip title="Staccato">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        onClick={props.onClick}
        height="35px"
        width="10px"
        style={baseSvgStyle(props)}
      >
        <text fill={color} style={{ transform: 'translate(0px, 24px)', fontSize: genericDurationFontSize }}>
          {
            // https://w3c.github.io/smufl/latest/tables/individual-notes.html
            '\uE1D5'
          }
        </text>
        <text fill={color} style={{ transform: 'translate(4px, 30px)', fontSize: genericDurationFontSize }}>
          {
            // https://w3c.github.io/smufl/latest/tables/articulation.html#articulation-ue4a0ue4bf
            '\uE4A3'
          }
        </text>
      </svg>
    </Tooltip>
  );
}

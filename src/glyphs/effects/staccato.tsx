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
        <path d="M7,6 L7,24" stroke={color} strokeWidth="0.96" style={{ fill: 'none' }} />
        <text fill={color} style={{ transform: 'translate(0px, 24px)', fontSize: genericDurationFontSize }}></text>
        <circle cx="4" cy="30" r="2" stroke="black" strokeWidth="1" fill={color} />
      </svg>
    </Tooltip>
  );
}

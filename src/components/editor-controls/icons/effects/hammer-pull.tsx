import React from 'react';
import { Tooltip } from '@mui/material';
import { DynamicGlyphProps } from '../dynamics/dynamic';
import { useGlyphColor } from '../glyphColor';
import baseSvgStyle from '../glyphBaseSvgStyle';

export default function HammerPullNoteGlyph(props: DynamicGlyphProps) {
  const color = useGlyphColor(props);
  return (
    <Tooltip title="Hammer On / Pull Off">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="20px"
        width="28px"
        onClick={props.onClick}
        style={baseSvgStyle(props)}
      >
        <text fill={color} style={{ transform: 'translate(4px, 8px)', fontSize: '10px' }}>HO</text>
        <path d="M 0 20 C 6 12 16 12 22 20 M 20 20 C 14 14 8 14 2 20 Z" fill={color} style={{ stroke: 'none' }} />
      </svg>
    </Tooltip>
  );
}

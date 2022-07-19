import React from 'react';
import { Tooltip } from '@mui/material';
import { DynamicGlyphProps } from '../dynamics/dynamic';
import { useGlyphColor } from '../glyphColor';
import baseSvgStyle from '../glyphBaseSvgStyle';

export default function GhostNoteGlyph(props: DynamicGlyphProps) {
  const color = useGlyphColor(props);
  return (
    <Tooltip title="Ghost Note">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="20px"
        width="28px"
        onClick={props.onClick}
        style={baseSvgStyle(props)}
      >
        <text fill={color} style={{ transform: 'translate(4px, 16px)' }}>( )</text>
      </svg>
    </Tooltip>
  );
}

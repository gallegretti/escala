import React from 'react';
import { Tooltip } from '@mui/material';
import { DynamicGlyphProps } from '../dynamics/dynamic';
import { useGlyphColor } from '../glyphColor';
import baseSvgStyle from '../glyphBaseSvgStyle';

export default function DeadNoteGlyph(props: DynamicGlyphProps) {
  const color = useGlyphColor(props);
  return (
    <Tooltip title="Dead Note">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="23px"
        width="20px"
        onClick={props.onClick}
        style={baseSvgStyle(props)}
      >
        <text fill={color} style={{ transform: 'translate(4px, 12px)', fontSize: '40px' }}></text>
      </svg>
    </Tooltip>
  );
}

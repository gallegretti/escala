import React from 'react';
import { Tooltip } from '@mui/material';
import { DynamicGlyphProps } from '../dynamics/dynamic';
import { useGlyphColor } from '../glyphColor';
import baseSvgStyle from '../glyphBaseSvgStyle';

export default function SlideNoteGlyph(props: DynamicGlyphProps) {
  const color = useGlyphColor(props);
  return (
    <Tooltip title="Slide">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="20px"
        width="28px"
        onClick={props.onClick}
        style={baseSvgStyle(props)}
      >
        <path d="M 0 20 L 15 1 L 16 2 L 1 21 Z Z" fill={color} style={{ stroke: 'none' }} />
      </svg>
    </Tooltip>
  );
}

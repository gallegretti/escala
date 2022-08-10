import React from 'react';
import { Tooltip } from '@mui/material';
import { DynamicGlyphProps } from '../../dynamics/dynamic';
import { useGlyphColor } from '../../glyphColor';
import baseSvgStyle from '../../glyphBaseSvgStyle';

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
        <path d="M 0 15 L 20 0 Z Z" fill={color} strokeWidth="1" stroke={color} />
      </svg>
    </Tooltip>
  );
}

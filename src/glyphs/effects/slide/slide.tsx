import React from 'react';
import { Tooltip } from '@mui/material';
import { glyphAsciFontfamily } from '@glyphs/glyphTextFont';
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
        <text
          fill={color}
          style={{ fontSize: '12px', fontFamily: glyphAsciFontfamily, transform: 'translate(2px, 8px)' }}
        >
          1
        </text>
        <text
          fill={color}
          style={{ fontSize: '12px', fontFamily: glyphAsciFontfamily, transform: 'translate(14px, 16px)' }}
        >
          3
        </text>
        <path d="M 2 16 L 18 1 Z Z" fill={color} strokeWidth="1" stroke={color} />
      </svg>
    </Tooltip>
  );
}

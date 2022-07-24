import React from 'react';
import { Tooltip } from '@mui/material';
import { DynamicGlyphProps } from '../dynamics/dynamic';
import { useGlyphColor } from '../glyphColor';
import baseSvgStyle from '../glyphBaseSvgStyle';

export default function CloseRepeatGlyph(props: DynamicGlyphProps) {
  const color = useGlyphColor(props);
  return (
    <Tooltip title="Close Repeat">
      <svg
        height="20px"
        width="12px"
        onClick={props.onClick}
        xmlns="http://www.w3.org/2000/svg"
        style={baseSvgStyle(props)}
      >
        <path
          fill={color}
          d="M 10 1 L 10 20 L 12 20 L 12 1"
        />
        <path
          fill={color}
          d="M 5 6 A 1 1 0 0 0 7 6 A 1 1 0 0 0 5 6 Z"
        />
        <path
          fill={color}
          d="M 5 14 A 1 1 0 0 0 7 14 A 1 1 0 0 0 5 14 Z"
        />
      </svg>
    </Tooltip>
  );
}

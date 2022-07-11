/* eslint-disable max-len */
import React from 'react';
import { Tooltip } from '@mui/material';
import { DynamicGlyphProps } from '../dynamics/dynamic';
import { useGlyphColor } from '../glyphColor';
import baseSvgStyle from '../glyphBaseSvgStyle';

export default function ChordGlyph(props: DynamicGlyphProps) {
  const color = useGlyphColor(props);
  return (
    <Tooltip title="Chord">
      <svg
        id={props.id}
        height="25px"
        width="18px"
        onClick={props.onClick}
        xmlns="http://www.w3.org/2000/svg"
        style={baseSvgStyle(props)}
      >
        <path
          stroke={color}
          fill={color}
          d="M 5 21 L 5 12 L 6 12 L 6 21 Z Z M 0 0 L 16 0 L 16 1 L 0 1 Z M 0 1 L 0 21 L 1 21 L 1 1 Z M 16 0 L 16 22 L 15 22 L 15 0 Z M 16 22 L 0 22 L 0 21 L 16 21 Z M 1 11 L 16 11 L 16 12 L 1 12 Z M 5 1 L 5 11 L 6 11 L 6 1 Z Z Z Z Z M 10 1 L 10 11 L 11 11 L 11 1 Z M 10 12 L 10 21 L 11 21 L 11 12 Z"
        />
      </svg>
    </Tooltip>
  );
}

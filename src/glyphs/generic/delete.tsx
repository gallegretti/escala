/* eslint-disable max-len */
import React from 'react';
import { Tooltip } from '@mui/material';
import { DynamicGlyphProps } from '../dynamics/dynamic';
import baseSvgStyle from '../glyphBaseSvgStyle';
import { useGlyphColor } from '../glyphColor';

export default function DeleteGlyph(props: DynamicGlyphProps) {
  const color = useGlyphColor(props);
  return (
    <Tooltip title="Delete">
      <svg
        id={props.id}
        height="24px"
        viewBox="0 0 24 24"
        width="24px"
        onClick={props.onClick}
        xmlns="http://www.w3.org/2000/svg"
        style={baseSvgStyle(props)}
        fill={color}
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
      </svg>
    </Tooltip>
  );
}

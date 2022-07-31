/* eslint-disable max-len */
import React from 'react';
import { Tooltip } from '@mui/material';
import { useGlyphColor } from '../glyphColor';
import { BaseGlyphProps } from '../glyphBaseProps';
import baseSvgStyle from '../glyphBaseSvgStyle';

export default function OpenGlyph(props: BaseGlyphProps) {
  const color = useGlyphColor(props);
  // https://fonts.google.com/icons?selected=Material%20Icons%3Afile_open%3A
  return (
    <Tooltip title="Open File">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        id={props.id}
        enableBackground="new 0 0 24 24"
        height="24px"
        viewBox="0 0 24 24"
        width="24px"
        onClick={props.onClick}
        style={baseSvgStyle(props)}
        fill={color}
      >
        <g>
          <rect fill="none" height="24" width="24" />
        </g>
        <g>
          <path d="M14,2H6C4.9,2,4,2.9,4,4v16c0,1.1,0.89,2,1.99,2H15v-8h5V8L14,2z M13,9V3.5L18.5,9H13z M17,21.66V16h5.66v2h-2.24 l2.95,2.95l-1.41,1.41L19,19.41l0,2.24H17z" />
        </g>
      </svg>
    </Tooltip>
  );
}

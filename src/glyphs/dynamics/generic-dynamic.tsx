import React from 'react';
import { Tooltip } from '@mui/material';
import { DynamicGlyphProps, baseTextStyle } from './dynamic';
import { useGlyphColor } from '../glyphColor';
import baseSvgStyle from '../glyphBaseSvgStyle';

export default function GenericDynamicGlyph(props: DynamicGlyphProps) {
  const color = useGlyphColor(props);
  return (
    <Tooltip title={props.title ?? ''}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        onClick={props.onClick}
        height={props.height ?? '25px'}
        width={props.width ?? '50px'}
        style={baseSvgStyle(props)}
      >
        <text fill={color} style={{ ...baseTextStyle(), transform: 'translate(4px, 16px)' }}>
          {props.children}
        </text>
      </svg>
    </Tooltip>
  );
}

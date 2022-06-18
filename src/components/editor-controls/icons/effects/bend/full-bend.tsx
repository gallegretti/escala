import React from 'react';
import { Tooltip } from '@mui/material';
import { useGlyphColor } from '../../glyphColor';
import { baseSvgStyle } from '../../glyphBaseSvgStyle';
import { BaseGlyphProps } from '../../glyphBaseProps';
import { bendTextStyle } from './bend-common';

export function FullBendGlyph(props: BaseGlyphProps) {
  const color = useGlyphColor(props);
  return (
    <Tooltip title={props.hideTooltip ? '' : 'Full Bend'}>
      <svg height="30px" width="32px" onClick={props.onClick} xmlns="http://www.w3.org/2000/svg" style={{ ...baseSvgStyle(props) }}>
        <text style={{ ...bendTextStyle(), transform: 'translate(0px, 10px)' }} fill={color}>Full</text>
        <path d="M 23 24 C 23 24 23 24 23 5" stroke={color} style={{ fill: 'none' }} />
        <path d="M 23 4 L 20 9 L 26 9 z" fill={color} style={{ stroke: 'none' }} />
      </svg>
    </Tooltip>
  );
}

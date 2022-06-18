import React from 'react';
import { Tooltip } from '@mui/material';
import { useGlyphColor } from '../../glyphColor';
import baseSvgStyle from '../../glyphBaseSvgStyle';
import { BaseGlyphProps } from '../../glyphBaseProps';
import bendTextStyle from './bend-common';

export default function FullPreBendGlyph(props: BaseGlyphProps) {
  const color = useGlyphColor(props);
  return (
    <Tooltip title={props.hideTooltip ? '' : 'Full Pre Bend'}>
      <svg height="30px" width="32px" onClick={props.onClick} xmlns="http://www.w3.org/2000/svg" style={{ ...baseSvgStyle(props) }}>
        <text style={{ ...bendTextStyle(), transform: 'translate(0px, 10px)' }} fill={color}>Full</text>
        <path d="M 15 24 c 4 0 8 0 8 -19" stroke={color} style={{ fill: 'none' }} />
        <path d="M 23 4 L 20 9 L 26 9 z" fill={color} style={{ stroke: 'none' }} />
      </svg>
    </Tooltip>
  );
}

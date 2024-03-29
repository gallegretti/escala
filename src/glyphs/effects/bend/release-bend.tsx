import React from 'react';
import { Tooltip } from '@mui/material';
import { useGlyphColor } from '../../glyphColor';
import baseSvgStyle from '../../glyphBaseSvgStyle';
import { BaseGlyphProps } from '../../glyphBaseProps';

export default function ReleaseBendGlyph(props: BaseGlyphProps) {
  const color = useGlyphColor(props);
  return (
    <Tooltip title={props.hideTooltip ? '' : 'Release'}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="30px"
        width="10px"
        onClick={props.onClick}
        style={baseSvgStyle(props)}
      >
        <path d="M 11 24 C 7 24 3 24 3 5" stroke={color} style={{ fill: 'none' }} />
        <path d="M 3 4 L 1 9 L 5 9 z" fill={color} style={{ stroke: 'none' }} />
      </svg>
    </Tooltip>
  );
}

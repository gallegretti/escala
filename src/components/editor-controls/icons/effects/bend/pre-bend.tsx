import React from 'react';
import { Tooltip } from '@mui/material';
import { useGlyphColor } from '../../glyphColor';
import baseSvgStyle from '../../glyphBaseSvgStyle';
import { BaseGlyphProps } from '../../glyphBaseProps';

export default function PreBendGlyph(props: BaseGlyphProps) {
  const color = useGlyphColor(props);
  return (
    <Tooltip title={props.hideTooltip ? '' : 'Pre-Bend'}>
      <svg height="30px" width="16px" onClick={props.onClick} style={baseSvgStyle({ disabled: props.disabled })} xmlns="http://www.w3.org/2000/svg">
        <path d="M 0 24 C 4 24 8 24 8 5" stroke={color} style={{ fill: 'none' }} />
        <path d="M 8 4 L 6 9 L 10 9 z" fill={color} style={{ stroke: 'none' }} />
      </svg>
    </Tooltip>
  );
}

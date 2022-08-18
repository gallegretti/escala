import React from 'react';
import { Tooltip } from '@mui/material';
import { DynamicGlyphProps } from '../dynamics/dynamic';
import { useGlyphColor } from '../glyphColor';
import baseSvgStyle from '../glyphBaseSvgStyle';

export default function OpenRepeatGlyph(props: DynamicGlyphProps) {
  const color = useGlyphColor(props);
  return (
    <Tooltip title="Open Repeat">
      <svg
        height="22px"
        width="12px"
        onClick={props.onClick}
        xmlns="http://www.w3.org/2000/svg"
        style={baseSvgStyle(props)}
      >
        <text
          fill={color}
          style={{ transform: 'translate(0px, 22px)', fontSize: '22px' }}
        >
          {
            // https://w3c.github.io/smufl/latest/tables/repeats.htm
            '\uE040'
          }
        </text>
      </svg>
    </Tooltip>
  );
}

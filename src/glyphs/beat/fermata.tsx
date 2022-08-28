import React from 'react';
import { Tooltip } from '@mui/material';
import { DynamicGlyphProps } from '../dynamics/dynamic';
import { useGlyphColor } from '../glyphColor';
import baseSvgStyle from '../glyphBaseSvgStyle';

export default function FermataGlyph(props: DynamicGlyphProps) {
  const color = useGlyphColor(props);
  return (
    <Tooltip title="Fermata">
      <svg
        id={props.id}
        height="22px"
        width="14px"
        onClick={props.onClick}
        xmlns="http://www.w3.org/2000/svg"
        style={baseSvgStyle(props)}
      >
        <text
          fill={color}
          style={{ transform: 'translate(0px, 14px)', fontSize: '20px' }}
        >
          {
            // https://w3c.github.io/smufl/latest/tables/holds-and-pauses.html
            '\uE4C4'
          }
        </text>
      </svg>
    </Tooltip>
  );
}

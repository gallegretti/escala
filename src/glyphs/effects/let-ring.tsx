import React from 'react';
import { Tooltip } from '@mui/material';
import { DynamicGlyphProps } from '../dynamics/dynamic';
import { useGlyphColor } from '../glyphColor';
import baseSvgStyle from '../glyphBaseSvgStyle';
import { glyphAsciFontfamily } from '../glyphTextFont';

export default function LetRingGlyph(props: DynamicGlyphProps) {
  const color = useGlyphColor(props);
  return (
    <Tooltip title="Let Ring">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="20px"
        width="34px"
        onClick={props.onClick}
        style={baseSvgStyle(props)}
      >
        <text
          fill={color}
          style={{ fontSize: '16px', fontFamily: glyphAsciFontfamily, transform: 'translate(4px, 16px)' }}
        >
          L.R
        </text>
      </svg>
    </Tooltip>
  );
}

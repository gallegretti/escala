import React from 'react';
import { Tooltip } from '@mui/material';
import { DynamicGlyphProps } from '../dynamics/dynamic';
import { useGlyphColor } from '../glyphColor';
import baseSvgStyle from '../glyphBaseSvgStyle';
import { glyphAsciFontfamily } from '../glyphTextFont';

export default function PalmMuteGlyph(props: DynamicGlyphProps) {
  const color = useGlyphColor(props);
  return (
    <Tooltip title="Palm Mute">
      <svg height="20px" width="38px" onClick={props.onClick} xmlns="http://www.w3.org/2000/svg" style={baseSvgStyle(props)}>
        <text fill={color} style={{ fontFamily: glyphAsciFontfamily, transform: 'translate(4px, 16px)' }}>P.M</text>
      </svg>
    </Tooltip>
  );
}

import React from 'react';
import { Tooltip } from '@mui/material';
import { DynamicGlyphProps } from '../../dynamics/dynamic';
import { useGlyphColor } from '../../glyphColor';
import baseSvgStyle from '../../glyphBaseSvgStyle';
import { glyphAsciFontfamily } from '../../glyphTextFont';

export default function GenericHarmonicGlyph(props: DynamicGlyphProps) {
  const color = useGlyphColor(props);
  return (
    <Tooltip ref={props.ref} title={props.hideTooltip ? '' : (props.title ?? '')}>
      <svg onClick={props.onClick} height={props.height ?? '18px'} width={props.width ?? '32px'} xmlns="http://www.w3.org/2000/svg" style={baseSvgStyle(props)}>
        <text fill={color} style={{ fontSize: '16px', fontFamily: glyphAsciFontfamily, transform: 'translate(4px, 16px)' }}>{props.children}</text>
      </svg>
    </Tooltip>
  );
}

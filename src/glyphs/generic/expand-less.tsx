import React from 'react';
import { DynamicGlyphProps } from '../dynamics/dynamic';
import baseSvgStyle from '../glyphBaseSvgStyle';
import { useGlyphColor } from '../glyphColor';

export default function ExpandLessGlyph(props: DynamicGlyphProps) {
  const color = useGlyphColor(props);
  return (
    <svg
      id={props.id}
      height="24px"
      viewBox="0 0 24 24"
      width="24px"
      onClick={props.onClick}
      xmlns="http://www.w3.org/2000/svg"
      style={baseSvgStyle(props)}
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path fill={color} d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14l-6-6z" />
    </svg>
  );
}

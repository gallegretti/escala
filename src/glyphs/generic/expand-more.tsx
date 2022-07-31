import React from 'react';
import { DynamicGlyphProps } from '../dynamics/dynamic';
import baseSvgStyle from '../glyphBaseSvgStyle';
import { useGlyphColor } from '../glyphColor';

export default function ExpandMoreGlyph(props: DynamicGlyphProps) {
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
      <path d="M0 0h24v24H0z" fill="none" />
      <path fill={color} d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
    </svg>
  );
}

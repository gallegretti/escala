import React from 'react';
import { Tooltip } from '@mui/material';
import { useGlyphColor } from '../glyphColor';
import { BaseGlyphProps } from '../glyphBaseProps';
import baseSvgStyle from '../glyphBaseSvgStyle';

export function UndoGlyph(props: BaseGlyphProps) {
  const color = useGlyphColor(props);
  // https://fonts.google.com/icons?selected=Material%20Icons%3Aundo%3A
  return (
    <Tooltip title="Undo">
      <svg id={props.id} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" onClick={props.onClick} style={baseSvgStyle(props)} fill={color}>
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z" />
      </svg>
    </Tooltip>
  );
}

/* eslint-disable max-len */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Tooltip } from '@mui/material';
import { useGlyphColor } from '../glyphColor';
import { BaseGlyphProps } from '../glyphBaseProps';
import baseSvgStyle from '../glyphBaseSvgStyle';

export default function NewGlyph(props: BaseGlyphProps) {
  const color = useGlyphColor(props);
  const { t } = useTranslation();
  // https://fonts.google.com/icons?selected=Material%20Icons%3Anote_add%3A
  return (
    <Tooltip title={t('New File')}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        id={props.id}
        height="24px"
        viewBox="0 0 24 24"
        width="24px"
        onClick={props.onClick}
        style={baseSvgStyle(props)}
        fill={color}
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 14h-3v3h-2v-3H8v-2h3v-3h2v3h3v2zm-3-7V3.5L18.5 9H13z" />
      </svg>
    </Tooltip>
  );
}

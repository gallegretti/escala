/* eslint-disable max-len */
import React from 'react';
import { Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useGlyphColor } from '../glyphColor';
import { BaseGlyphProps } from '../glyphBaseProps';
import baseSvgStyle from '../glyphBaseSvgStyle';

export default function RedoGlyph(props: BaseGlyphProps) {
  const color = useGlyphColor(props);
  const { t } = useTranslation();
  // https://fonts.google.com/icons?selected=Material%20Icons%3Aredo%3A
  return (
    <Tooltip title={t('Redo')}>
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
        <path d="M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16c1.05-3.19 4.05-5.5 7.6-5.5 1.95 0 3.73.72 5.12 1.88L13 16h9V7l-3.6 3.6z" />
      </svg>
    </Tooltip>
  );
}

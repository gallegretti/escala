import React from 'react';
import { Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useGlyphColor } from '../glyphColor';
import { BaseGlyphProps } from '../glyphBaseProps';
import baseSvgStyle from '../glyphBaseSvgStyle';

export default function ExportGlyph(props: BaseGlyphProps) {
  const color = useGlyphColor(props);
  const { t } = useTranslation();
  // https://fonts.google.com/icons?selected=Material%20Icons%3Afile_download%3A
  return (
    <Tooltip title={props.hideTooltip ? '' : t('Download')}>
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
        <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
      </svg>
    </Tooltip>
  );
}

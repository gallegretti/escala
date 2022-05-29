import React from 'react';
import { useGlyphColor } from '../glyphColor';
import { BaseGlyphProps } from '../glyphBaseProps';
import { baseSvgStyle } from '../glyphBaseSvgStyle';
import { Tooltip } from '@mui/material';

export function ExportGlyph(props: BaseGlyphProps) {
    const color = useGlyphColor(props);
    // https://fonts.google.com/icons?selected=Material%20Icons%3Afile_download%3A
    return (
        <Tooltip title={props.hideTooltip ? "" : "Download"}>
            <svg id={props.id} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" onClick={props.onClick} style={baseSvgStyle(props)} fill={color}>
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
            </svg>
        </Tooltip>
    );
}
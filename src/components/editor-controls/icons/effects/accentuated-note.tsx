import React from 'react';
import { DynamicGlyphProps } from '../dynamics/dynamic';
import { useGlyphColor } from '../glyphColor';
import { baseSvgStyle } from '../glyphBaseSvgStyle';
import { Tooltip } from '@mui/material';

export function AccentuatedNoteGlyph(props: DynamicGlyphProps) {
    const color = useGlyphColor(props);
    return (
        <Tooltip title={"Accentuated Note"}>
            <svg height="20px" width="20px" onClick={props.onClick} xmlns="http://www.w3.org/2000/svg" style={baseSvgStyle(props)}>
                <text fill={color} style={{ transform: 'translate(4px, 16px)', fontSize: '40px' }}></text>
            </svg>
        </Tooltip>
    );
}
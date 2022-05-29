import React from 'react';
import { DynamicGlyphProps } from '../dynamics/dynamic';
import { useGlyphColor } from '../glyphColor';
import { baseSvgStyle } from '../glyphBaseSvgStyle';
import { Tooltip } from '@mui/material';

export function DeadNoteGlyph(props: DynamicGlyphProps) {
    const color = useGlyphColor(props);
    return (
        <Tooltip title={"Dead Note"}>
            <svg height="23px" width="20px" onClick={props.onClick} xmlns="http://www.w3.org/2000/svg" style={baseSvgStyle(props)}>
                <text fill={color} style={{ transform: 'translate(4px, 12px)', fontSize: '40px' }}></text>
            </svg>
        </Tooltip>
    );
}
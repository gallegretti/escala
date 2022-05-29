import React from 'react';
import { DynamicGlyphProps } from '../dynamics/dynamic';
import { useGlyphColor } from '../glyphColor';
import { baseSvgStyle } from '../glyphBaseSvgStyle';
import { Tooltip } from '@mui/material';

export function TapNoteGlyph(props: DynamicGlyphProps) {
    const color = useGlyphColor(props);
    return (
        <Tooltip title={"Tap"}>
            <svg height="23px" width="20px" onClick={props.onClick} xmlns="http://www.w3.org/2000/svg" style={baseSvgStyle(props)}>
                <text fill={color} style={{ transform: 'translate(0px, 19px)', fontFamily: 'Roboto', fontSize: '18px' }}>T</text>
            </svg>
        </Tooltip>
    );
}
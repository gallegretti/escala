import React from 'react';
import { DynamicGlyphProps } from '../dynamics/dynamic';
import { useGlyphColor } from '../glyphColor';
import { baseSvgStyle } from '../glyphBaseSvgStyle';
import { Tooltip } from '@mui/material';
import { glyphAsciFontfamily } from '../glyphTextFont';

export function TextGlyph(props: DynamicGlyphProps) {
    const color = useGlyphColor(props);
    return (
        <Tooltip title={"Set text"}>
            <svg height="20px" width="45px" onClick={props.onClick} xmlns="http://www.w3.org/2000/svg" style={baseSvgStyle(props)}>
                <text fill={color} style={{ transform: 'translate(4px, 16px)', fontFamily: glyphAsciFontfamily, fontSize: '20px' }}>Text</text>
            </svg>
        </Tooltip>
    );
}
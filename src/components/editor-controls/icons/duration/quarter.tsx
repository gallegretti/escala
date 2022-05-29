import React from 'react';
import { DurationGlyphProps } from './duration';
import { useGlyphColor } from '../glyphColor';
import { baseSvgStyle } from '../glyphBaseSvgStyle';
import { genericDurationFontSize } from './generic-duration';
import { Tooltip } from '@mui/material';

export function QuarterGlyph(props: DurationGlyphProps) {
    const color = useGlyphColor(props);
    return (
        <Tooltip title={"Quarter"}>
            <svg onClick={props.onClick} height="35px" width="10px" xmlns="http://www.w3.org/2000/svg" style={baseSvgStyle(props)}>
                <path d="M7,6 L7,27" stroke={color} strokeWidth="0.96" style={{ fill: 'none' }}></path>
                <text fill={color} style={{ transform: 'translate(0px, 29px)', fontSize: genericDurationFontSize }}></text>
            </svg>
        </Tooltip>
    );
}
import React from 'react';
import { DynamicGlyphProps } from '../dynamics/dynamic';
import { useGlyphColor } from '../glyphColor';
import { baseSvgStyle } from '../glyphBaseSvgStyle';

function Stop(props: DynamicGlyphProps) {
    const color = useGlyphColor({ ...props, selected: false });
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="40px" fill={color} onClick={props.onClick} viewBox="0 0 24 24" width="40px" style={baseSvgStyle(props)}>
            <g>
                <rect fill="none" height="24" width="24" />
            </g>
            <g>
                <g>
                    <path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M11,16H9V8h2V16z M15,16h-2V8h2V16z" />
                </g>
            </g>
        </svg>
    );
}

function Play(props: DynamicGlyphProps) {
    const color = useGlyphColor({ ...props, selected: false });
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="40px" fill={color} onClick={props.onClick} viewBox="0 0 24 24" width="40px" style={baseSvgStyle(props)}>
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
        </svg>
    );
}

export function PlayPauseGlyph(props: DynamicGlyphProps) {
    return (
        <>
            { !props.selected ? Play(props) : Stop(props) }
        </>
    );
}
import React from 'react';
import { useGlyphColor } from '../glyphColor';
import { BaseGlyphProps } from '../glyphBaseProps';
import { baseSvgStyle } from '../glyphBaseSvgStyle';
import { Tooltip } from '@mui/material';

export function TempoGlyph(props: BaseGlyphProps) {
    const color = useGlyphColor(props);
    // https://fonts.google.com/icons?selected=Material%20Symbols%20Outlined%3Atimer%3AFILL%400%3Bwght%40400%3BGRAD%400%3Bopsz%4048
    return (
        <Tooltip title={"Tempo"}>
            <svg id={props.id} xmlns="http://www.w3.org/2000/svg" width="24px" viewBox="0 0 48 48" onClick={props.onClick} style={baseSvgStyle(props)} fill={color}>
                <path d="M18 5V2H30V5ZM22.5 27.35H25.5V15.85H22.5ZM24 43.95Q20.3 43.95 17.025 42.525Q13.75 41.1 11.3 38.65Q8.85 36.2 7.425 32.925Q6 29.65 6 25.95Q6 22.25 7.425 18.975Q8.85 15.7 11.3 13.25Q13.75 10.8 17.025 9.375Q20.3 7.95 24 7.95Q27.35 7.95 30.3 9.075Q33.25 10.2 35.55 12.2L38.1 9.65L40.2 11.75L37.65 14.3Q39.45 16.3 40.725 19.15Q42 22 42 25.95Q42 29.65 40.575 32.925Q39.15 36.2 36.7 38.65Q34.25 41.1 30.975 42.525Q27.7 43.95 24 43.95ZM24 40.95Q30.25 40.95 34.625 36.575Q39 32.2 39 25.95Q39 19.7 34.625 15.325Q30.25 10.95 24 10.95Q17.75 10.95 13.375 15.325Q9 19.7 9 25.95Q9 32.2 13.375 36.575Q17.75 40.95 24 40.95ZM24 26Q24 26 24 26Q24 26 24 26Q24 26 24 26Q24 26 24 26Q24 26 24 26Q24 26 24 26Q24 26 24 26Q24 26 24 26Z"/>
            </svg>
        </Tooltip>
    );
}
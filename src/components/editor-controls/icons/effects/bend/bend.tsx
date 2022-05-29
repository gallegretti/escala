import React from 'react';
import { Tooltip } from '@mui/material';
import { useGlyphColor } from '../../glyphColor';
import { baseSvgStyle } from '../../glyphBaseSvgStyle';
import { BaseGlyphProps } from '../../glyphBaseProps';

export function BendGlyph(props: BaseGlyphProps) {
    const color = useGlyphColor(props);
    return (
        <Tooltip title={props.hideTooltip ? "" : "Bend"}>
            <svg height="30px" width="16px" onClick={props.onClick} xmlns="http://www.w3.org/2000/svg" style={baseSvgStyle(props)}>
                <path d="M 8 26 C 8 24 8 24 8 5" stroke={color} style={{ fill: "none" }}></path>
                <path d="M 8 4 L 6 9 L 10 9 z" fill={color} style={{ stroke: "none" }}></path>
            </svg>
        </Tooltip>
    );
}
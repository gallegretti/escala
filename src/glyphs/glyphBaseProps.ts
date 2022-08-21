import React, { CSSProperties } from 'react';

export interface BaseGlyphProps {
    id?: string;
    selected: boolean;
    disabled: boolean;
    onClick: (event?: any) => void;
    children?: React.ReactNode;
    hideTooltip?: boolean;
    extraSvgStyles?: CSSProperties;
    ref?: any;
}

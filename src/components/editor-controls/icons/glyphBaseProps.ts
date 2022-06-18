export interface BaseGlyphProps {
    id?: string;
    selected: boolean;
    disabled: boolean;
    onClick: (event?: any) => void;
    children?: any;
    hideTooltip?: boolean;
    ref?: any;
}

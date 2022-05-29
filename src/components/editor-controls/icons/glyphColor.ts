import { useTheme } from '@mui/material';

export interface GlyphBaseProps {
    height?: string;
    width?: string;
    title?: string;
    selected: boolean;
    disabled: boolean;
    onClick: () => void;
    children?: JSX.Element | string;
}

export function useGlyphColor(props: { disabled: boolean, selected: boolean }) {
    const theme = useTheme();
    if (props.disabled) {
        return '#a6a5a4';
    }
    if (props.selected) {
        return '#1976d2';
    }
    return theme.palette.mode === 'dark' ? '#ffffff' : '#000000';
}

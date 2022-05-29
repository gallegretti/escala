import { glyphSymbolFontfamily } from "./glyphTextFont";

export function baseSvgStyle(props: { disabled: boolean }): React.CSSProperties {
    return {
        fontFamily: glyphSymbolFontfamily,
        cursor: props.disabled ? 'auto' : 'pointer',
        userSelect: 'none'
    };
}

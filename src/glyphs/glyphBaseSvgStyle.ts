import React from 'react';
import { glyphSymbolFontfamily } from './glyphTextFont';

export default function baseSvgStyle(props: { disabled: boolean }): React.CSSProperties {
  return {
    fontFamily: glyphSymbolFontfamily,
    cursor: props.disabled ? 'auto' : 'pointer',
    userSelect: 'none',
  };
}

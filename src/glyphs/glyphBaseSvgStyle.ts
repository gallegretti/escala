import React, { CSSProperties } from 'react';
import { glyphSymbolFontfamily } from './glyphTextFont';

export default function baseSvgStyle(props: { disabled: boolean, extraSvgStyles?: CSSProperties })
  : React.CSSProperties {
  return {
    fontFamily: glyphSymbolFontfamily,
    cursor: props.disabled ? 'auto' : 'pointer',
    userSelect: 'none',
    ...(props.extraSvgStyles ? props.extraSvgStyles : {}),
  };
}

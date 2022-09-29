import React, { CSSProperties } from 'react';
import { glyphSymbolFontfamily } from './glyphTextFont';

interface BaseSvgStyleProps {
  disabled: boolean;
  extraSvgStyles?: CSSProperties;
  onClick?: () => void;
}

export default function baseSvgStyle(props: BaseSvgStyleProps)
  : React.CSSProperties {
  return {
    fontFamily: glyphSymbolFontfamily,
    cursor: (props.disabled || !props.onClick) ? 'auto' : 'pointer',
    flexShrink: 0,
    userSelect: 'none',
    ...(props.extraSvgStyles ? props.extraSvgStyles : {}),
  };
}

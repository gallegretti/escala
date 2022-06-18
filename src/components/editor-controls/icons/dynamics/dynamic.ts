import { BaseGlyphProps } from '../glyphBaseProps';

export interface DynamicGlyphProps extends BaseGlyphProps {
    height?: string;
    width?: string;
    title?: string;
}

export function baseTextStyle() {
  return {
    fontSize: '26px',
  };
}

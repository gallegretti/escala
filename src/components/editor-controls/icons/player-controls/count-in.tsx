import { Tooltip } from '@mui/material';
import { DynamicGlyphProps } from '../dynamics/dynamic';
import { baseSvgStyle } from '../glyphBaseSvgStyle';
import { useGlyphColor } from '../glyphColor';

function CountInEnabledGlyph(props: DynamicGlyphProps) {
  const color = useGlyphColor({ ...props, selected: false });
  return (
    <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill={color} onClick={props.onClick} style={baseSvgStyle(props)}>
      <g>
        <rect fill="none" height="24" width="24" />
      </g>
      <g>
        <path d="M6,2l0.01,6L10,12l-3.99,4.01L6,22h12v-6l-4-4l4-3.99V2H6z M16,16.5V20H8v-3.5l4-4L16,16.5z" />
      </g>
    </svg>
  );
}

function CountInDisabledGlyph(props: DynamicGlyphProps) {
  const color = useGlyphColor({ ...props, selected: false });
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill={color} onClick={props.onClick} style={baseSvgStyle(props)}>
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M6 2v6h.01L6 8.01 10 12l-4 4 .01.01H6V22h12v-5.99h-.01L18 16l-4-4 4-3.99-.01-.01H18V2H6zm10 14.5V20H8v-3.5l4-4 4 4zm-4-5l-4-4V4h8v3.5l-4 4z" />
    </svg>
  );
}

export function CountInGlyph(props: DynamicGlyphProps) {
  const Glyph = props.selected ? CountInEnabledGlyph : CountInDisabledGlyph;
  return (
    <Tooltip title="Count-in">
      {Glyph(props)}
    </Tooltip>
  );
}

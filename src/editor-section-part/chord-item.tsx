/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useGlyphColor } from '@glyphs/glyphColor';
import { Chord } from '../alphatab-types/alphatab-types';

export default function ChordItem({ chord, onClick, isSelected }:
  { chord: Chord; onClick: () => void; isSelected: boolean }) {
  const color = useGlyphColor({ disabled: false, selected: isSelected });
  return (
    <div
      key={chord.name}
      onClick={onClick}
      style={{
        cursor: 'pointer',
        color,
      }}
    >
      {chord.name}
    </div>
  );
}

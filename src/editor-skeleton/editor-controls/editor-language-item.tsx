import React from 'react';
import { MenuItem } from '@mui/material';
import { useGlyphColor } from '@glyphs/glyphColor';

export default function EditorLanguageItem({ language, onClick, isSelected }
  : { language: string; isSelected: boolean; onClick: () => void }) {
  const color = useGlyphColor({ disabled: false, selected: isSelected });
  return (
    <MenuItem
      selected={isSelected}
      onClick={onClick}
    >
      <span style={{ color }}>{language}</span>
    </MenuItem>
  );
}

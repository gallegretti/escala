import React from 'react';
import { useTheme } from '@mui/material';

export default function ChordNut() {
  const theme = useTheme();
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        backgroundColor: theme.palette.text.primary,
        left: '-12px',
        width: 'calc(100% + 24px)',
        height: '8px',
        zIndex: '99',
      }}
    />
  );
}

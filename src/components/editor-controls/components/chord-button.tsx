/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { useTheme } from '@mui/material';
import { Chord } from '../../../alphatab-types/alphatab-types';
import ChordGlyph from '../icons/beat/chord';
import ExpandMoreGlyph from '../icons/generic/expand-more';
import { StyledPopper } from './styled-popper';
import useAnchorElem from './use-anchor-element';

interface ChordButtonProps {
  disabled: boolean;
  setChord: () => void;
  useChord: (arg: Chord) => void;
  chords: Chord[];
}

export default function ChordButton(props: ChordButtonProps) {
  const [isPopperOpen, setIsPopperOpen] = useState(false);
  const [anchorElem, setAnchorElement] = useAnchorElem();
  const theme = useTheme();

  const onExpandMoreClick = (e: any) => {
    setAnchorElement(e);
    setIsPopperOpen(!isPopperOpen);
  };

  return (
    <div>
      <ChordGlyph
        id="chord"
        disabled={props.disabled}
        selected={false}
        onClick={() => props.setChord()}
      />
      {props.chords.length > 0
        && <ExpandMoreGlyph disabled={false} selected={false} onClick={onExpandMoreClick} />}
      <StyledPopper anchorEl={anchorElem} open={isPopperOpen} disablePortal>
        {props.chords.map((chord) => (
          <div
            key={chord.name}
            onClick={() => props.useChord(chord)}
            style={{
              cursor: 'pointer',
              color: theme.palette.text.primary,
            }}
          >
            {chord.name}
          </div>
        ))}
      </StyledPopper>
    </div>
  );
}

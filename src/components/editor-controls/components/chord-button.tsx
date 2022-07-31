/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { useTheme } from '@mui/material';
import ChordGlyph from '@glyphs/beat/chord';
import ExpandMoreGlyph from '@glyphs/generic/expand-more';
import useAnchorElem from '@hooks/use-anchor-element';
import { Chord } from '../../../alphatab-types/alphatab-types';
import { StyledPopper } from './styled-popper';

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
    if (props.disabled) {
      return;
    }
    setAnchorElement(e);
    setIsPopperOpen(!isPopperOpen);
  };

  const clickChord = () => {
    if (props.disabled) {
      return;
    }
    props.setChord();
  };

  return (
    <div style={{ display: 'flex' }}>
      <ChordGlyph
        id="chord"
        disabled={props.disabled}
        selected={false}
        onClick={clickChord}
      />
      {props.chords.length > 0
        && <ExpandMoreGlyph disabled={props.disabled} selected={false} onClick={onExpandMoreClick} />}
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

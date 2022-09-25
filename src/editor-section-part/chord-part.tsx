import React, { useState } from 'react';
import ChordGlyph from '@glyphs/beat/chord';
import ExpandMoreGlyph from '@glyphs/generic/expand-more';
import useAnchorElem from '@hooks/use-anchor-element';
import { Chord } from '../alphatab-types/alphatab-types';
import StyledPopper from './styled-popper';
import ChordItem from './chord-item';

interface ChordSectionProps {
  disabled: boolean;
  currentChord: Chord | null;
  setChord: () => void;
  useChord: (arg: Chord | null) => void;
  chords: Chord[];
}

export default function ChordSection(props: ChordSectionProps) {
  const [isPopperOpen, setIsPopperOpen] = useState(false);
  const [anchorElem, setAnchorElement] = useAnchorElem();

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

  const useChord = (chord: Chord) => {
    if (props.currentChord?.name === chord.name) {
      props.useChord(null);
    } else {
      props.useChord(chord);
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <ChordGlyph
        id="chord"
        disabled={props.disabled}
        selected={props.currentChord !== null}
        onClick={clickChord}
      />
      {props.chords.length > 0
        && (
          <ExpandMoreGlyph
            disabled={props.disabled}
            selected={props.currentChord !== null}
            onClick={onExpandMoreClick}
          />
        )}
      <StyledPopper anchorEl={anchorElem} open={isPopperOpen} disablePortal>
        {props.chords.map((chord) => (
          <ChordItem
            key={chord.name}
            isSelected={chord.name === props.currentChord?.name}
            chord={chord}
            onClick={() => useChord(chord)}
          />
        ))}
      </StyledPopper>
    </div>
  );
}

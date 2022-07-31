import React from 'react';
import { Input } from '@mui/material';
import OpenRepeatGlyph from '@glyphs/beat/open-repeat';
import TextGlyph from '@glyphs/beat/text';
import UpstrokeGlyph from '@glyphs/beat/upstroke';
import DownStrokeGlyph from '@glyphs/beat/downstroke';
import CloseRepeatGlyph from '@glyphs/beat/close-repeat';
import ExpandMoreGlyph from '@glyphs/generic/expand-more';
import useAnchorElem from '@hooks/use-anchor-element';
import { StyledPopper } from '@editor-section-part/styled-popper';
import ChordButton from '@editor-section-part/chord-button';
import { Chord, PickStroke } from '../alphatab-types/alphatab-types';
import EditorScoreState from '../editor/editor-score-state';
import EditorActionDispatcher from '../editor/editor-action-dispatcher';
import SectionDivider from './section-divider';
import RepeatPart from '@editor-section-part/repeat-part';

interface BeatSectionProps {
  editorScoreState: EditorScoreState;
  actionDispatcher: EditorActionDispatcher;
  setText: () => void;
  setChord: () => void;
  useChord: (arg: Chord) => void;
  chords: Chord[];
}

export default function BeatSection(props: BeatSectionProps) {
  const setPickStroke = (newPickStroke: PickStroke) => {
    if (props.editorScoreState.currentSelectedBeatPickStroke === newPickStroke) {
      props.actionDispatcher.setPickStroke(alphaTab.model.PickStroke.None);
    } else {
      props.actionDispatcher.setPickStroke(newPickStroke);
    }
  };

  const isDisabled = !props.editorScoreState.hasSelectedBeat;

  return (
    <>
      <TextGlyph
        disabled={isDisabled}
        selected={false}
        onClick={() => {
          if (!isDisabled) {
            props.setText();
          }
        }}
      />
      <SectionDivider />
      <UpstrokeGlyph
        disabled={isDisabled}
        selected={props.editorScoreState.currentSelectedBeatPickStroke === alphaTab.model.PickStroke.Up}
        onClick={() => setPickStroke(alphaTab.model.PickStroke.Up)}
      />
      <DownStrokeGlyph
        disabled={isDisabled}
        selected={props.editorScoreState.currentSelectedBeatPickStroke === alphaTab.model.PickStroke.Down}
        onClick={() => setPickStroke(alphaTab.model.PickStroke.Down)}
      />
      <SectionDivider />
      <ChordButton
        disabled={isDisabled}
        chords={props.chords}
        setChord={props.setChord}
        useChord={props.useChord}
      />
      <SectionDivider />
      <RepeatPart
        actionDispatcher={props.actionDispatcher}
        editorScoreState={props.editorScoreState}
      />
    </>
  );
}

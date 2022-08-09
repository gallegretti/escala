import React from 'react';
import TextGlyph from '@glyphs/beat/text';
import UpstrokeGlyph from '@glyphs/beat/upstroke';
import DownStrokeGlyph from '@glyphs/beat/downstroke';
import ChordButton from '@editor-section-part/chord-button';
import RepeatPart from '@editor-section-part/repeat-part';
import { Chord, PickStroke } from '../alphatab-types/alphatab-types';
import EditorScoreState from '../editor/editor-score-state';
import EditorActionDispatcher from '../editor/editor-action-dispatcher';
import SectionDivider from './section-divider';

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
        selected={props.editorScoreState.currentChord !== null}
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

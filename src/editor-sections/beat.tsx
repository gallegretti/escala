import React from 'react';
import TextGlyph from '@glyphs/beat/text';
import UpstrokeGlyph from '@glyphs/beat/upstroke';
import DownStrokeGlyph from '@glyphs/beat/downstroke';
import FermataGlyph from '@glyphs/beat/fermata';
import ChordSection from '@editor-section-part/chord-part';
import RepeatPart from '@editor-section-part/repeat-part';
import { Chord, Fermata, PickStroke } from '../alphatab-types/alphatab-types';
import EditorScoreState from '../editor/editor-score-state';
import EditorActionDispatcher from '../editor/editor-action-dispatcher';
import SectionDivider from './section-divider';

interface BeatSectionProps {
  editorScoreState: EditorScoreState;
  actionDispatcher: EditorActionDispatcher;
  setText: () => void;
  setChord: () => void;
  useChord: (arg: Chord | null) => void;
  chords: Chord[];
}

export default function BeatSection(props: BeatSectionProps) {
  const setPickStroke = (newPickStroke: PickStroke) => {
    if (props.editorScoreState.selectionBeatPickStroke === newPickStroke) {
      props.actionDispatcher.setPickStroke(alphaTab.model.PickStroke.None);
    } else {
      props.actionDispatcher.setPickStroke(newPickStroke);
    }
  };

  const setFermata = () => {
    if (props.editorScoreState.selectionFermata === null) {
      props.actionDispatcher.setFermata(new alphaTab.model.Fermata())
    } else {
      props.actionDispatcher.setFermata(null);
    }
  }

  const isDisabled = !props.editorScoreState.hasSelectedBeat;

  return (
    <>
      <TextGlyph
        disabled={isDisabled}
        selected={props.editorScoreState.selectionText !== null}
        onClick={() => {
          if (!isDisabled) {
            props.setText();
          }
        }}
      />
      <SectionDivider />
      <FermataGlyph
        disabled={isDisabled}
        selected={props.editorScoreState.selectionFermata !== null}
        onClick={setFermata}
      />
      <SectionDivider />
      <UpstrokeGlyph
        disabled={isDisabled}
        selected={props.editorScoreState.selectionBeatPickStroke === alphaTab.model.PickStroke.Up}
        onClick={() => setPickStroke(alphaTab.model.PickStroke.Up)}
      />
      <DownStrokeGlyph
        disabled={isDisabled}
        selected={props.editorScoreState.selectionBeatPickStroke === alphaTab.model.PickStroke.Down}
        onClick={() => setPickStroke(alphaTab.model.PickStroke.Down)}
      />
      <SectionDivider />
      <ChordSection
        disabled={isDisabled}
        currentChord={props.editorScoreState.selectionChord}
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

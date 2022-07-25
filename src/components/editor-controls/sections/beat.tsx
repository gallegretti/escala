import React from 'react';
import { Divider } from '@mui/material';
import TextGlyph from '../icons/beat/text';
import UpstrokeGlyph from '../icons/beat/upstroke';
import DownStrokeGlyph from '../icons/beat/downstroke';
import { Chord, PickStroke } from '../../../alphatab-types/alphatab-types';
import ChordButton from '../components/chord-button';
import OpenRepeatGlyph from '../icons/beat/open-repeat';
import CloseRepeatGlyph from '../icons/beat/close-repeat';
import EditorScoreState from '../../../editor/editor-score-state';
import EditorActionDispatcher from '../../../editor/editor-action-dispatcher';

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

  return (
    <>
      <TextGlyph
        disabled={!props.editorScoreState.hasSelectedBeat}
        selected={false}
        onClick={() => {
          if (props.editorScoreState.hasSelectedBeat) {
            props.setText();
          }
        }}
      />
      <Divider variant="middle" orientation="vertical" flexItem />
      <UpstrokeGlyph
        disabled={!props.editorScoreState.hasSelectedBeat}
        selected={props.editorScoreState.currentSelectedBeatPickStroke === alphaTab.model.PickStroke.Up}
        onClick={() => setPickStroke(alphaTab.model.PickStroke.Up)}
      />
      <DownStrokeGlyph
        disabled={!props.editorScoreState.hasSelectedBeat}
        selected={props.editorScoreState.currentSelectedBeatPickStroke === alphaTab.model.PickStroke.Down}
        onClick={() => setPickStroke(alphaTab.model.PickStroke.Down)}
      />
      <Divider variant="middle" orientation="vertical" flexItem />
      <ChordButton
        disabled={!props.editorScoreState.hasSelectedBeat}
        chords={props.chords}
        setChord={props.setChord}
        useChord={props.useChord}
      />
      <Divider variant="middle" orientation="vertical" flexItem />
      <OpenRepeatGlyph
        selected={props.editorScoreState.isOpenRepeat}
        disabled={!props.editorScoreState.hasSelectedBeat}
        onClick={() => props.actionDispatcher.setOpenRepeat(!props.editorScoreState.isOpenRepeat)}
      />
      <CloseRepeatGlyph
        selected={props.editorScoreState.numberOfRepetitions > 1}
        disabled={!props.editorScoreState.hasSelectedBeat}
        onClick={() => {
          // TODO: get number of repetitions from user
          if (props.editorScoreState.numberOfRepetitions === 0) {
            props.actionDispatcher.setCloseRepeat(2);
          } else {
            props.actionDispatcher.setCloseRepeat(0);
          }
        }}
      />
    </>
  );
}

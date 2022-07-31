import React from 'react';
import { Divider, Input } from '@mui/material';
import TextGlyph from '../icons/beat/text';
import UpstrokeGlyph from '../icons/beat/upstroke';
import DownStrokeGlyph from '../icons/beat/downstroke';
import { Chord, PickStroke } from '../../../alphatab-types/alphatab-types';
import ChordButton from '../components/chord-button';
import OpenRepeatGlyph from '../icons/beat/open-repeat';
import CloseRepeatGlyph from '../icons/beat/close-repeat';
import EditorScoreState from '../../../editor/editor-score-state';
import EditorActionDispatcher from '../../../editor/editor-action-dispatcher';
import ExpandMoreGlyph from '../icons/generic/expand-more';
import { StyledPopper } from '../components/styled-popper';
import useAnchorElem from '../../../hooks/use-anchor-element';

interface BeatSectionProps {
  editorScoreState: EditorScoreState;
  actionDispatcher: EditorActionDispatcher;
  setText: () => void;
  setChord: () => void;
  useChord: (arg: Chord) => void;
  chords: Chord[];
}

export default function BeatSection(props: BeatSectionProps) {
  const [anchorElem, setAnchorElem] = useAnchorElem();

  const setPickStroke = (newPickStroke: PickStroke) => {
    if (props.editorScoreState.currentSelectedBeatPickStroke === newPickStroke) {
      props.actionDispatcher.setPickStroke(alphaTab.model.PickStroke.None);
    } else {
      props.actionDispatcher.setPickStroke(newPickStroke);
    }
  };

  const hasCloseRepeat = props.editorScoreState.numberOfRepetitions > 0;
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
      <Divider variant="middle" orientation="vertical" flexItem />
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
      <Divider variant="middle" orientation="vertical" flexItem />
      <ChordButton
        disabled={isDisabled}
        chords={props.chords}
        setChord={props.setChord}
        useChord={props.useChord}
      />
      <Divider variant="middle" orientation="vertical" flexItem />
      <OpenRepeatGlyph
        selected={props.editorScoreState.isOpenRepeat}
        disabled={isDisabled}
        onClick={() => props.actionDispatcher.setOpenRepeat(!props.editorScoreState.isOpenRepeat)}
      />
      <CloseRepeatGlyph
        selected={hasCloseRepeat}
        disabled={isDisabled}
        onClick={(event) => {
          if (isDisabled) {
            return;
          }
          setAnchorElem(event);
          if (!hasCloseRepeat) {
            props.actionDispatcher.setCloseRepeat(1);
          } else {
            props.actionDispatcher.setCloseRepeat(0);
          }
        }}
      />
      {hasCloseRepeat
        && (
          <ExpandMoreGlyph
            disabled={false}
            selected={false}
            onClick={(e) => {
              if (isDisabled) {
                return;
              }
              if (anchorElem) {
                setAnchorElem(null);
              } else {
                setAnchorElem(e);
              }
            }}
          />
        )}

      {anchorElem
        && (
          <StyledPopper anchorEl={anchorElem} open disablePortal>
            <Input
              type="number"
              title="Number of repetitions"
              value={props.editorScoreState.numberOfRepetitions}
              onChange={(e) => {
                props.actionDispatcher.setCloseRepeat(Number.parseInt(e.target.value, 10));
              }}
              style={{ width: '40px' }}
            />
          </StyledPopper>
        )}
    </>
  );
}

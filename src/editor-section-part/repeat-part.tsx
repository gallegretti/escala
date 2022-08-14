import React from 'react';
import CloseRepeatGlyph from '@glyphs/beat/close-repeat';
import OpenRepeatGlyph from '@glyphs/beat/open-repeat';
import ExpandMoreGlyph from '@glyphs/generic/expand-more';
import { Input } from '@mui/material';
import useAnchorElem from '@hooks/use-anchor-element';
import StyledPopper from './styled-popper';
import EditorScoreState from '../editor/editor-score-state';
import EditorActionDispatcher from '../editor/editor-action-dispatcher';

interface RepeatPartProps {
  editorScoreState: EditorScoreState;
  actionDispatcher: EditorActionDispatcher;
}

export default function RepeatPart(props: RepeatPartProps) {
  const [anchorElem, setAnchorElem] = useAnchorElem();

  const hasCloseRepeat = props.editorScoreState.selectionNumberOfRepetitions > 0;
  const isDisabled = !props.editorScoreState.hasSelectedBeat;
  return (
    <>
      <OpenRepeatGlyph
        selected={props.editorScoreState.selectionIsOpenRepeat}
        disabled={isDisabled}
        onClick={() => props.actionDispatcher.setOpenRepeat(!props.editorScoreState.selectionIsOpenRepeat)}
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
              value={props.editorScoreState.selectionNumberOfRepetitions}
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

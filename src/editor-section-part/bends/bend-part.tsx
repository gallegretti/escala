import React from 'react';
import { BendType } from '../../alphatab-types/bend-type';
import { BendState } from '../../editor-skeleton/editor-controls/editor-controls';
import EditorActionDispatcher from '../../editor/editor-action-dispatcher';
import EditorScoreState from '../../editor/editor-score-state';
import BendButton from './bend-button';
import PreBendButton from './pre-bend-button';
import ReleaseBendButton from './release-button';

type BendSectionPartProps = {
  editorScoreState: EditorScoreState;
  actionDispatcher: EditorActionDispatcher;
  openPopper: string | null;
  updateOpenPopper: (popper: string) => void;
};

export default function BendPart(props: BendSectionPartProps) {
  const setBend = (newBend: keyof BendState, bendType: BendType) => {
    if (props.editorScoreState.selectiondBend === null) {
      return;
    }
    if (props.editorScoreState.selectiondBend[newBend] === bendType) {
      props.actionDispatcher.setBend({
        ...props.editorScoreState.selectiondBend,
        [newBend]: null,
      });
    } else {
      props.actionDispatcher.setBend({
        ...props.editorScoreState.selectiondBend,
        [newBend]: bendType,
      });
    }
  };

  return (
    <>
      <PreBendButton
        disabled={!props.editorScoreState.hasSelectedNote}
        preBend={props.editorScoreState.selectiondBend?.preBend ?? null}
        setPreBend={(bendType) => { setBend('preBend', bendType); }}
        isPopperOpen={props.openPopper === 'pre-bend'}
        setPopperOpen={() => props.updateOpenPopper('pre-bend')}
      />
      <BendButton
        disabled={!props.editorScoreState.hasSelectedNote}
        bend={props.editorScoreState.selectiondBend?.bend ?? null}
        setBend={(bendType) => { setBend('bend', bendType); }}
        isPopperOpen={props.openPopper === 'bend'}
        setPopperOpen={() => props.updateOpenPopper('bend')}
      />
      <ReleaseBendButton
        disabled={!props.editorScoreState.hasSelectedNote}
        release={props.editorScoreState.selectiondBend?.release ?? null}
        setRelease={(bendType) => { setBend('release', bendType); }}
        isPopperOpen={props.openPopper === 'release'}
        setPopperOpen={() => props.updateOpenPopper('release')}
      />
    </>
  );
}

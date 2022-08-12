import React from 'react';
import AccentuatedNoteGlyph from '@glyphs/effects/accentuated-note';
import HeavyAccentuatedNoteGlyph from '@glyphs/effects/heavy-accentuated-note';
import EditorScoreState from '../editor/editor-score-state';
import { AccentuationType } from '../alphatab-types/alphatab-types';
import EditorActionDispatcher from '../editor/editor-action-dispatcher';

type AccentuationPartProps = {
  editorScoreState: EditorScoreState;
  actionDispatcher: EditorActionDispatcher;
};

export default function AccentuationPart(props: AccentuationPartProps) {
  const setAccentuation = (accentuation: AccentuationType) => {
    if (props.editorScoreState.currentSelectedNoteAccentuation === accentuation) {
      props.actionDispatcher.setAccentuationNote(alphaTab.model.AccentuationType.None);
    } else {
      props.actionDispatcher.setAccentuationNote(accentuation);
    }
  };

  return (
    <>
      <AccentuatedNoteGlyph
        disabled={!props.editorScoreState.hasSelectedNote}
        selected={props.editorScoreState.currentSelectedNoteAccentuation === alphaTab.model.AccentuationType.Normal}
        onClick={() => setAccentuation(alphaTab.model.AccentuationType.Normal)}
      />
      <HeavyAccentuatedNoteGlyph
        disabled={!props.editorScoreState.hasSelectedNote}
        selected={props.editorScoreState.currentSelectedNoteAccentuation === alphaTab.model.AccentuationType.Heavy}
        onClick={() => setAccentuation(alphaTab.model.AccentuationType.Heavy)}
      />
    </>
  )
}

import React from 'react';
import WholeGlyph from '@glyphs/duration/whole';
import HalfGlyph from '@glyphs/duration/half';
import QuarterGlyph from '@glyphs/duration/quarter';
import EighthGlyph from '@glyphs/duration/eighth';
import SixTeenthGlyph from '@glyphs/duration/sixteenth';
import ThirtySecondGlyph from '@glyphs/duration/thirty-second';
import SixtyFourGlyph from '@glyphs/duration/sixty-four';
import Tie from '@glyphs/duration/tie';
import EditorScoreState from '../editor/editor-score-state';
import EditorActionDispatcher from '../editor/editor-action-dispatcher';
import SectionDivider from './section-divider';

interface DurationSectionProps {
  editorScoreState: EditorScoreState;
  actionDispatcher: EditorActionDispatcher;
}

export default function DurationSetion({ actionDispatcher, editorScoreState }: DurationSectionProps) {
  return (
    <>
      <WholeGlyph
        disabled={!editorScoreState.hasSelectedNote}
        selected={editorScoreState.selectionBeatDuration === alphaTab.model.Duration.Whole}
        onClick={() => actionDispatcher.setDuration(alphaTab.model.Duration.Whole)}
      />
      <HalfGlyph
        disabled={!editorScoreState.hasSelectedNote}
        selected={editorScoreState.selectionBeatDuration === alphaTab.model.Duration.Half}
        onClick={() => actionDispatcher.setDuration(alphaTab.model.Duration.Half)}
      />
      <QuarterGlyph
        disabled={!editorScoreState.hasSelectedNote}
        selected={editorScoreState.selectionBeatDuration === alphaTab.model.Duration.Quarter}
        onClick={() => actionDispatcher.setDuration(alphaTab.model.Duration.Quarter)}
      />
      <EighthGlyph
        disabled={!editorScoreState.hasSelectedNote}
        selected={editorScoreState.selectionBeatDuration === alphaTab.model.Duration.Eighth}
        onClick={() => actionDispatcher.setDuration(alphaTab.model.Duration.Eighth)}
      />
      <SixTeenthGlyph
        disabled={!editorScoreState.hasSelectedNote}
        selected={editorScoreState.selectionBeatDuration === alphaTab.model.Duration.Sixteenth}
        onClick={() => actionDispatcher.setDuration(alphaTab.model.Duration.Sixteenth)}
      />
      <ThirtySecondGlyph
        disabled={!editorScoreState.hasSelectedNote}
        selected={editorScoreState.selectionBeatDuration === alphaTab.model.Duration.ThirtySecond}
        onClick={() => actionDispatcher.setDuration(alphaTab.model.Duration.ThirtySecond)}
      />
      <SixtyFourGlyph
        disabled={!editorScoreState.hasSelectedNote}
        selected={editorScoreState.selectionBeatDuration === alphaTab.model.Duration.SixtyFourth}
        onClick={() => actionDispatcher.setDuration(alphaTab.model.Duration.SixtyFourth)}
      />
      <SectionDivider />
      <Tie
        disabled={!editorScoreState.hasSelectedNote}
        onClick={() => actionDispatcher.setTieNote(!editorScoreState.selectionIsTie)}
        selected={editorScoreState.selectionIsTie}
      />
    </>
  );
}

import React from 'react';
import PianoPianissimoGlyph from '@glyphs/dynamics/ppp';
import PianissimoGlyph from '@glyphs/dynamics/pp';
import PianoGlyph from '@glyphs/dynamics/p';
import MezzoPianoGlyph from '@glyphs/dynamics/mp';
import ForteGlyph from '@glyphs/dynamics/f';
import FortissimoGlyph from '@glyphs/dynamics/ff';
import MezzoForteGlyph from '@glyphs/dynamics/mf';
import ForteFortissimoGlyph from '@glyphs/dynamics/fff';
import EditorActionDispatcher from '../editor/editor-action-dispatcher';
import EditorScoreState from '../editor/editor-score-state';

interface DynamicsSectionProps {
  editorScoreState: EditorScoreState;
  actionDispatcher: EditorActionDispatcher;
}

export default function DynamicsSection({ actionDispatcher, editorScoreState }: DynamicsSectionProps) {
  return (
    <>
      <PianoPianissimoGlyph
        disabled={!editorScoreState.hasSelectedNote}
        selected={editorScoreState.currentSelectedBeatDynamics === alphaTab.model.DynamicValue.PPP}
        onClick={() => actionDispatcher.setDynamics(alphaTab.model.DynamicValue.PPP)}
      />
      <PianissimoGlyph
        disabled={!editorScoreState.hasSelectedNote}
        selected={editorScoreState.currentSelectedBeatDynamics === alphaTab.model.DynamicValue.PP}
        onClick={() => actionDispatcher.setDynamics(alphaTab.model.DynamicValue.PP)}
      />
      <PianoGlyph
        disabled={!editorScoreState.hasSelectedNote}
        selected={editorScoreState.currentSelectedBeatDynamics === alphaTab.model.DynamicValue.P}
        onClick={() => actionDispatcher.setDynamics(alphaTab.model.DynamicValue.P)}
      />
      <MezzoPianoGlyph
        disabled={!editorScoreState.hasSelectedNote}
        selected={editorScoreState.currentSelectedBeatDynamics === alphaTab.model.DynamicValue.MP}
        onClick={() => actionDispatcher.setDynamics(alphaTab.model.DynamicValue.MP)}
      />
      <MezzoForteGlyph
        disabled={!editorScoreState.hasSelectedNote}
        selected={editorScoreState.currentSelectedBeatDynamics === alphaTab.model.DynamicValue.MF}
        onClick={() => actionDispatcher.setDynamics(alphaTab.model.DynamicValue.MF)}
      />
      <ForteGlyph
        disabled={!editorScoreState.hasSelectedNote}
        selected={editorScoreState.currentSelectedBeatDynamics === alphaTab.model.DynamicValue.F}
        onClick={() => actionDispatcher.setDynamics(alphaTab.model.DynamicValue.F)}
      />
      <FortissimoGlyph
        disabled={!editorScoreState.hasSelectedNote}
        selected={editorScoreState.currentSelectedBeatDynamics === alphaTab.model.DynamicValue.FF}
        onClick={() => actionDispatcher.setDynamics(alphaTab.model.DynamicValue.FF)}
      />
      <ForteFortissimoGlyph
        disabled={!editorScoreState.hasSelectedNote}
        selected={editorScoreState.currentSelectedBeatDynamics === alphaTab.model.DynamicValue.FFF}
        onClick={() => actionDispatcher.setDynamics(alphaTab.model.DynamicValue.FFF)}
      />
    </>
  );
}

import React from 'react';
import PianoPianissimoGlyph from '../icons/dynamics/ppp';
import PianissimoGlyph from '../icons/dynamics/pp';
import PianoGlyph from '../icons/dynamics/p';
import MezzoPianoGlyph from '../icons/dynamics/mp';
import ForteGlyph from '../icons/dynamics/f';
import FortissimoGlyph from '../icons/dynamics/ff';
import MezzoForteGlyph from '../icons/dynamics/mf';
import ForteFortissimoGlyph from '../icons/dynamics/fff';
import EditorActionDispatcher from '../../../editor/editor-action-dispatcher';
import EditorScoreState from '../../../editor/editor-score-state';

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

import React, { useState } from 'react';
import PalmMuteGlyph from '@glyphs/effects/palm-mute';
import GhostNoteGlyph from '@glyphs/effects/ghost-note';
import DeadNoteGlyph from '@glyphs/effects/dead-note';
import TapNoteGlyph from '@glyphs/effects/tap-note';
import VibratoNoteGlyph from '@glyphs/effects/vibratro';
import HammerPullNoteGlyph from '@glyphs/effects/hammer-pull';
import StaccatoGlyph from '@glyphs/effects/staccato';
import LetRingGlyph from '@glyphs/effects/let-ring';
import HarmonicPart from '@editor-section-part/harmonic-part';
import SlidePart from '@editor-section-part/slide-part';
import BendPart from '@editor-section-part/bends/bend-part';
import AccentuationPart from '@editor-section-part/accentuation-part';
import SectionDivider from './section-divider';
import EditorScoreState from '../editor/editor-score-state';
import EditorActionDispatcher from '../editor/editor-action-dispatcher';

interface EffectsSectionProps {
  editorScoreState: EditorScoreState;
  actionDispatcher: EditorActionDispatcher;
}

export default function EffectsSection(props: EffectsSectionProps) {
  const [openPopper, setOpenPopper] = useState<string | null>(null);

  const updateOpenPopper = (popperId: string) => {
    setOpenPopper((popper) => (popper === popperId ? null : popperId));
  };

  return (
    <>
      <PalmMuteGlyph
        disabled={!props.editorScoreState.hasSelectedNote}
        selected={props.editorScoreState.isCurrentSelectedNotePalmMute ?? false}
        onClick={() => props.actionDispatcher.setPalmMute(!props.editorScoreState.isCurrentSelectedNotePalmMute)}
      />
      <LetRingGlyph
        disabled={!props.editorScoreState.hasSelectedNote}
        selected={props.editorScoreState.isCurrentSelectedNoteLetRing ?? false}
        onClick={() => props.actionDispatcher.setLetRing(!props.editorScoreState.isCurrentSelectedNoteLetRing)}
      />
      <GhostNoteGlyph
        disabled={!props.editorScoreState.hasSelectedNote}
        selected={props.editorScoreState.currentSelectedNoteIsGhost ?? false}
        onClick={() => props.actionDispatcher.setGhostNote(!props.editorScoreState.currentSelectedNoteIsGhost)}
      />
      <DeadNoteGlyph
        disabled={!props.editorScoreState.hasSelectedNote}
        selected={props.editorScoreState.currentSelectedNoteDead ?? false}
        onClick={() => props.actionDispatcher.setDeadNote(!props.editorScoreState.currentSelectedNoteDead)}
      />
      <TapNoteGlyph
        disabled={!props.editorScoreState.hasSelectedNote}
        selected={props.editorScoreState.isLeftHandTapNote ?? false}
        onClick={() => props.actionDispatcher.setTapNote(!props.editorScoreState.isLeftHandTapNote)}
      />
      <VibratoNoteGlyph
        disabled={!props.editorScoreState.hasSelectedNote}
        selected={props.editorScoreState.isVibrato ?? false}
        onClick={() => props.actionDispatcher.setVibratoNote(props.editorScoreState.isVibrato
          ? alphaTab.model.VibratoType.None : alphaTab.model.VibratoType.Slight)}
      />
      <HarmonicPart
        actionDispatcher={props.actionDispatcher}
        editorScoreState={props.editorScoreState}
        currentHarmonicType={props.editorScoreState.currentSelectedNoteHarmonicType ?? 0}
        openPopper={openPopper}
        updateOpenPopper={updateOpenPopper}
      />
      <HammerPullNoteGlyph
        disabled={!props.editorScoreState.hasSelectedNote}
        onClick={() => { props.actionDispatcher.setHammer(!props.editorScoreState.currentSelectedNoteHammerOrPull); }}
        selected={props.editorScoreState.currentSelectedNoteHammerOrPull ?? false}
      />
      <SectionDivider />
      <AccentuationPart
        actionDispatcher={props.actionDispatcher}
        editorScoreState={props.editorScoreState}
      />
      <SectionDivider />
      <BendPart
        actionDispatcher={props.actionDispatcher}
        editorScoreState={props.editorScoreState}
        openPopper={openPopper}
        updateOpenPopper={updateOpenPopper}
      />
      <SectionDivider />
      <SlidePart
        actionDispatcher={props.actionDispatcher}
        editorScoreState={props.editorScoreState}
      />
      <SectionDivider />
      <StaccatoGlyph
        disabled={!props.editorScoreState.hasSelectedNote}
        selected={props.editorScoreState.isCurrentSelectedNoteStaccato}
        onClick={() => props.actionDispatcher.setStaccato(!props.editorScoreState.isCurrentSelectedNoteStaccato)}
      />
    </>
  );
}

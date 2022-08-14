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
        selected={props.editorScoreState.selectionIsPalmMute ?? false}
        onClick={() => props.actionDispatcher.setPalmMute(!props.editorScoreState.selectionIsPalmMute)}
      />
      <LetRingGlyph
        disabled={!props.editorScoreState.hasSelectedNote}
        selected={props.editorScoreState.selectionIsLetRing ?? false}
        onClick={() => props.actionDispatcher.setLetRing(!props.editorScoreState.selectionIsLetRing)}
      />
      <GhostNoteGlyph
        disabled={!props.editorScoreState.hasSelectedNote}
        selected={props.editorScoreState.selectionNoteIsGhost ?? false}
        onClick={() => props.actionDispatcher.setGhostNote(!props.editorScoreState.selectionNoteIsGhost)}
      />
      <DeadNoteGlyph
        disabled={!props.editorScoreState.hasSelectedNote}
        selected={props.editorScoreState.selectionNoteDead ?? false}
        onClick={() => props.actionDispatcher.setDeadNote(!props.editorScoreState.selectionNoteDead)}
      />
      <TapNoteGlyph
        disabled={!props.editorScoreState.hasSelectedNote}
        selected={props.editorScoreState.selectionIsLeftHandTap ?? false}
        onClick={() => props.actionDispatcher.setTapNote(!props.editorScoreState.selectionIsLeftHandTap)}
      />
      <VibratoNoteGlyph
        disabled={!props.editorScoreState.hasSelectedNote}
        selected={props.editorScoreState.selectionIsVibrato ?? false}
        onClick={() => props.actionDispatcher.setVibratoNote(props.editorScoreState.selectionIsVibrato
          ? alphaTab.model.VibratoType.None : alphaTab.model.VibratoType.Slight)}
      />
      <HarmonicPart
        actionDispatcher={props.actionDispatcher}
        editorScoreState={props.editorScoreState}
        currentHarmonicType={props.editorScoreState.selectionNoteHarmonicType ?? 0}
        openPopper={openPopper}
        updateOpenPopper={updateOpenPopper}
      />
      <HammerPullNoteGlyph
        disabled={!props.editorScoreState.hasSelectedNote}
        onClick={() => { props.actionDispatcher.setHammer(!props.editorScoreState.selectionNoteHammerOrPull); }}
        selected={props.editorScoreState.selectionNoteHammerOrPull ?? false}
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
        selected={props.editorScoreState.selectionIsStaccato}
        onClick={() => props.actionDispatcher.setStaccato(!props.editorScoreState.selectionIsStaccato)}
      />
    </>
  );
}

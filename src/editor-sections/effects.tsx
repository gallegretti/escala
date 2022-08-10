import React, { useState } from 'react';
import PalmMuteGlyph from '@glyphs/effects/palm-mute';
import GhostNoteGlyph from '@glyphs/effects/ghost-note';
import AccentuatedNoteGlyph from '@glyphs/effects/accentuated-note';
import HeavyAccentuatedNoteGlyph from '@glyphs/effects/heavy-accentuated-note';
import DeadNoteGlyph from '@glyphs/effects/dead-note';
import TapNoteGlyph from '@glyphs/effects/tap-note';
import VibratoNoteGlyph from '@glyphs/effects/vibratro';
import HammerPullNoteGlyph from '@glyphs/effects/hammer-pull';
import LetRingGlyph from '@glyphs/effects/let-ring';
import HarmonicButton from '@editor-section-part/harmonic-button';
import PreBendButton from '@editor-section-part/bends/pre-bend-button';
import BendButton from '@editor-section-part/bends/bend-button';
import ReleaseBendButton from '@editor-section-part/bends/release-button';
import SectionDivider from './section-divider';
import { BendState } from '../editor-skeleton/editor-controls/editor-controls';
import { BendType } from '../alphatab-types/bend-type';
import { AccentuationType } from '../alphatab-types/alphatab-types';
import EditorScoreState from '../editor/editor-score-state';
import EditorActionDispatcher from '../editor/editor-action-dispatcher';
import SlidePart from '@editor-section-part/slide-part';

interface EffectsSectionProps {
  editorScoreState: EditorScoreState;
  actionDispatcher: EditorActionDispatcher;
}

export default function EffectsSection(props: EffectsSectionProps) {
  const [openPopper, setOpenPopper] = useState<string | null>(null);
  const setBend = (newBend: keyof BendState, bendType: BendType) => {
    if (props.editorScoreState.currentSelectedBend === null) {
      return;
    }
    if (props.editorScoreState.currentSelectedBend[newBend] === bendType) {
      props.actionDispatcher.setBend({
        ...props.editorScoreState.currentSelectedBend,
        [newBend]: null,
      });
    } else {
      props.actionDispatcher.setBend({
        ...props.editorScoreState.currentSelectedBend,
        [newBend]: bendType,
      });
    }
  };

  const updateOpenPopper = (popperId: string) => {
    setOpenPopper((popper) => (popper === popperId ? null : popperId));
  };

  const setAccentuation = (accentuation: AccentuationType) => {
    if (props.editorScoreState.currentSelectedNoteAccentuation === accentuation) {
      props.actionDispatcher.setAccentuationNote(alphaTab.model.AccentuationType.None);
    } else {
      props.actionDispatcher.setAccentuationNote(accentuation);
    }
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
      <HarmonicButton
        disabled={!props.editorScoreState.hasSelectedNote}
        currentHarmonicType={props.editorScoreState.currentSelectedNoteHarmonicType ?? 0}
        setHarmonicType={props.actionDispatcher.setHarmonicType}
        isPopperOpen={openPopper === 'harmonic'}
        setPopperOpen={() => updateOpenPopper('harmonic')}
      />
      <HammerPullNoteGlyph
        disabled={!props.editorScoreState.hasSelectedNote}
        onClick={() => { props.actionDispatcher.setHammer(!props.editorScoreState.currentSelectedNoteHammerOrPull); }}
        selected={props.editorScoreState.currentSelectedNoteHammerOrPull ?? false}
      />
      <SectionDivider />
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
      <SectionDivider />
      <PreBendButton
        disabled={!props.editorScoreState.hasSelectedNote}
        preBend={props.editorScoreState.currentSelectedBend?.preBend ?? null}
        setPreBend={(bendType) => { setBend('preBend', bendType); }}
        isPopperOpen={openPopper === 'pre-bend'}
        setPopperOpen={() => updateOpenPopper('pre-bend')}
      />
      <BendButton
        disabled={!props.editorScoreState.hasSelectedNote}
        bend={props.editorScoreState.currentSelectedBend?.bend ?? null}
        setBend={(bendType) => { setBend('bend', bendType); }}
        isPopperOpen={openPopper === 'bend'}
        setPopperOpen={() => updateOpenPopper('bend')}
      />
      <ReleaseBendButton
        disabled={!props.editorScoreState.hasSelectedNote}
        release={props.editorScoreState.currentSelectedBend?.release ?? null}
        setRelease={(bendType) => { setBend('release', bendType); }}
        isPopperOpen={openPopper === 'release'}
        setPopperOpen={() => updateOpenPopper('release')}
      />
      <SectionDivider />
      <SlidePart
        actionDispatcher={props.actionDispatcher}
        editorScoreState={props.editorScoreState}
      />
    </>
  );
}

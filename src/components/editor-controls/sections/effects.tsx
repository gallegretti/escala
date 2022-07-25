import React, { useState } from 'react';
import { Divider } from '@mui/material';
import PalmMuteGlyph from '../icons/effects/palm-mute';
import GhostNoteGlyph from '../icons/effects/ghost-note';
import AccentuatedNoteGlyph from '../icons/effects/accentuated-note';
import HeavyAccentuatedNoteGlyph from '../icons/effects/heavy-accentuated-note';
import DeadNoteGlyph from '../icons/effects/dead-note';
import HarmonicButton from '../components/harmonic-button';
import PreBendButton from '../components/bends/pre-bend-button';
import BendButton from '../components/bends/bend-button';
import ReleaseBendButton from '../components/bends/release-button';
import { BendState } from '../editor-controls';
import { BendType } from '../../../editor/bend-type';
import TapNoteGlyph from '../icons/effects/tap-note';
import VibratoNoteGlyph from '../icons/effects/vibratro';
import { AccentuationType } from '../../../alphatab-types/alphatab-types';
import HammerPullNoteGlyph from '../icons/effects/hammer-pull';
import SlideNoteGlyph from '../icons/effects/slide';
import EditorScoreState from '../../../editor/editor-score-state';
import EditorActionDispatcher from '../../../editor/editor-action-dispatcher';

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
        onClick={() => props.actionDispatcher.togglePalmMute()}
      />
      <GhostNoteGlyph
        disabled={!props.editorScoreState.hasSelectedNote}
        selected={props.editorScoreState.currentSelectedNoteIsGhost ?? false}
        onClick={() => props.actionDispatcher.setGhostNote(!props.editorScoreState.currentSelectedNoteIsGhost)}
      />
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
        onClick={() => props.actionDispatcher.setVibratoNote(!props.editorScoreState.isVibrato)}
      />
      <Divider variant="middle" orientation="vertical" flexItem />
      <HarmonicButton
        disabled={!props.editorScoreState.hasSelectedNote}
        currentHarmonicType={props.editorScoreState.currentSelectedNoteHarmonicType ?? 0}
        setHarmonicType={props.actionDispatcher.setHarmonicType}
        isPopperOpen={openPopper === 'harmonic'}
        setPopperOpen={() => updateOpenPopper('harmonic')}
      />
      <Divider variant="middle" orientation="vertical" flexItem />
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
      <Divider variant="middle" orientation="vertical" flexItem />
      <HammerPullNoteGlyph
        disabled={!props.editorScoreState.hasSelectedNote}
        onClick={() => { props.actionDispatcher.setHammer(!props.editorScoreState.currentSelectedNoteHammerOrPull); }}
        selected={props.editorScoreState.currentSelectedNoteHammerOrPull ?? false}
      />
      <SlideNoteGlyph
        disabled={!props.editorScoreState.hasSelectedNote}
        onClick={() => { props.actionDispatcher.setSlide(!props.editorScoreState.currentSelectedNoteSlide); }}
        selected={props.editorScoreState.currentSelectedNoteSlide ?? false}
      />
    </>
  );
}

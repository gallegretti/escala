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
import { AccentuationType, HarmonicType } from '../../../alphatab-types/alphatab-types';
import HammerPullNoteGlyph from '../icons/effects/hammer-pull';
import SlideNoteGlyph from '../icons/effects/slide';

interface EffectsSectionProps {
  hasSelectedNote: boolean;
  isPalmMute: boolean | null;
  isGhost: boolean | null;
  isDeadNote: boolean | null;
  isLeftHandTapNote: boolean | null;
  isVibrato: boolean | null;
  isHammerOrPull: boolean | null;
  isSlide: boolean | null;
  currentHarmonicType: HarmonicType | null;
  currentAccentuation: AccentuationType | null;
  currentBend: BendState | null;
  togglePalmMute: () => void;
  setVibrato: (value: boolean) => void;
  setGhostNote: (value: boolean) => void;
  setAccentuationNote: (value: AccentuationType) => void;
  setDeadNote: (value: boolean) => void;
  setTapNote: (value: boolean) => void;
  setHarmonicType: (value: HarmonicType) => void;
  setBend: (bend: BendState) => void;
  setHammer: (value: boolean) => void;
  setSlide: (value: boolean) => void;
}

export default function EffectsSection(props: EffectsSectionProps) {
  const [openPopper, setOpenPopper] = useState<string | null>(null);
  const setBend = (newBend: keyof BendState, bendType: BendType) => {
    if (props.currentBend === null) {
      return;
    }
    if (props.currentBend[newBend] === bendType) {
      props.setBend({
        ...props.currentBend,
        [newBend]: null,
      });
    } else {
      props.setBend({
        ...props.currentBend,
        [newBend]: bendType,
      });
    }
  };

  const updateOpenPopper = (popperId: string) => {
    setOpenPopper((popper) => (popper === popperId ? null : popperId));
  };

  const setAccentuation = (accentuation: AccentuationType) => {
    if (props.currentAccentuation === accentuation) {
      props.setAccentuationNote(alphaTab.model.AccentuationType.None);
    } else {
      props.setAccentuationNote(accentuation);
    }
  };

  return (
    <>
      <PalmMuteGlyph
        disabled={!props.hasSelectedNote}
        selected={props.isPalmMute ?? false}
        onClick={() => props.togglePalmMute()}
      />
      <GhostNoteGlyph
        disabled={!props.hasSelectedNote}
        selected={props.isGhost ?? false}
        onClick={() => props.setGhostNote(!props.isGhost)}
      />
      <AccentuatedNoteGlyph
        disabled={!props.hasSelectedNote}
        selected={props.currentAccentuation === alphaTab.model.AccentuationType.Normal}
        onClick={() => setAccentuation(alphaTab.model.AccentuationType.Normal)}
      />
      <HeavyAccentuatedNoteGlyph
        disabled={!props.hasSelectedNote}
        selected={props.currentAccentuation === alphaTab.model.AccentuationType.Heavy}
        onClick={() => setAccentuation(alphaTab.model.AccentuationType.Heavy)}
      />
      <DeadNoteGlyph
        disabled={!props.hasSelectedNote}
        selected={props.isDeadNote ?? false}
        onClick={() => props.setDeadNote(!props.isDeadNote)}
      />
      <TapNoteGlyph
        disabled={!props.hasSelectedNote}
        selected={props.isLeftHandTapNote ?? false}
        onClick={() => props.setTapNote(!props.isLeftHandTapNote)}
      />
      <VibratoNoteGlyph
        disabled={!props.hasSelectedNote}
        selected={props.isVibrato ?? false}
        onClick={() => props.setVibrato(!props.isVibrato)}
      />
      <Divider variant="middle" orientation="vertical" flexItem />
      <HarmonicButton
        disabled={!props.hasSelectedNote}
        currentHarmonicType={props.currentHarmonicType ?? 0}
        setHarmonicType={props.setHarmonicType}
        isPopperOpen={openPopper === 'harmonic'}
        setPopperOpen={() => updateOpenPopper('harmonic')}
      />
      <Divider variant="middle" orientation="vertical" flexItem />
      <PreBendButton
        disabled={!props.hasSelectedNote}
        preBend={props.currentBend?.preBend ?? null}
        setPreBend={(bendType) => { setBend('preBend', bendType); }}
        isPopperOpen={openPopper === 'pre-bend'}
        setPopperOpen={() => updateOpenPopper('pre-bend')}
      />
      <BendButton
        disabled={!props.hasSelectedNote}
        bend={props.currentBend?.bend ?? null}
        setBend={(bendType) => { setBend('bend', bendType); }}
        isPopperOpen={openPopper === 'bend'}
        setPopperOpen={() => updateOpenPopper('bend')}
      />
      <ReleaseBendButton
        disabled={!props.hasSelectedNote}
        release={props.currentBend?.release ?? null}
        setRelease={(bendType) => { setBend('release', bendType); }}
        isPopperOpen={openPopper === 'release'}
        setPopperOpen={() => updateOpenPopper('release')}
      />
      <Divider variant="middle" orientation="vertical" flexItem />
      <HammerPullNoteGlyph
        disabled={!props.hasSelectedNote}
        onClick={() => { props.setHammer(!props.isHammerOrPull); }}
        selected={props.isHammerOrPull ?? false}
      />
      <SlideNoteGlyph
        disabled={!props.hasSelectedNote}
        onClick={() => { props.setSlide(!props.isSlide); }}
        selected={props.isSlide ?? false}
      />
    </>
  );
}

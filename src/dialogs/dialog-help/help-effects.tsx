import React from 'react';
import { Typography } from '@mui/material';
import PalmMuteGlyph from '@glyphs/effects/palm-mute';
import LetRingGlyph from '@glyphs/effects/let-ring';
import GhostNoteGlyph from '@glyphs/effects/ghost-note';
import { useTranslation } from 'react-i18next';
import DeadNoteGlyph from '@glyphs/effects/dead-note';
import TapNoteGlyph from '@glyphs/effects/tap-note';
import HammerPullNoteGlyph from '@glyphs/effects/hammer-pull';
import GenericHarmonicGlyph from '@glyphs/effects/harmonic/generic-harmonic';
import NaturalHarmonicGlyph from '@glyphs/effects/harmonic/natural-harmonic';
import ArtificialHarmonicGlyph from '@glyphs/effects/harmonic/artificial-harmonic';
import PinchHarmonicGlyph from '@glyphs/effects/harmonic/pinch-harmonic';
import TapHarmonicGlyph from '@glyphs/effects/harmonic/tap-harmonic';
import SemiHarmonicGlyph from '@glyphs/effects/harmonic/semi-harmonic';
import FeedbackHarmonicGlyph from '@glyphs/effects/harmonic/feedback-harmonic';
import AccentuatedNoteGlyph from '@glyphs/effects/accentuated-note';
import HeavyAccentuatedNoteGlyph from '@glyphs/effects/heavy-accentuated-note';
import PreBendGlyph from '@glyphs/effects/bend/pre-bend';
import BendGlyph from '@glyphs/effects/bend/bend';
import ReleaseBendGlyph from '@glyphs/effects/bend/release-bend';
import SlideInNoteGlyph from '@glyphs/effects/slide/slide-in';
import SlideNoteGlyph from '@glyphs/effects/slide/slide';
import SlideOutNoteGlyph from '@glyphs/effects/slide/slide-out';
import StaccatoGlyph from '@glyphs/effects/staccato';
import HelpTable, { HelpTableRow } from './help-table';

export default function HelpEffects() {
  const { t } = useTranslation(undefined, { keyPrefix: 'help.effects' });
  const rows: HelpTableRow[] = [
    [PalmMuteGlyph, t('palm_mute')],
    [LetRingGlyph, t('let_ring')],
    [GhostNoteGlyph, t('ghost_note')],
    [DeadNoteGlyph, t('dead_note')],
    [TapNoteGlyph, t('tap')],
    [HammerPullNoteGlyph, t('hammer_pull')],
    [StaccatoGlyph, t('staccato')],
  ];

  const harmonicas: HelpTableRow[] = [
    [GenericHarmonicGlyph, t('harmonic')],
    [NaturalHarmonicGlyph, t('harmonic_natural')],
    [ArtificialHarmonicGlyph, t('harmonic_artificial')],
    [PinchHarmonicGlyph, t('harmonic_pinch')],
    [TapHarmonicGlyph, t('harmonic_tap')],
    [SemiHarmonicGlyph, t('harmonic_semi')],
    [FeedbackHarmonicGlyph, t('harmonic_feedback')],
  ];

  const accentuationRows: HelpTableRow[] = [
    [AccentuatedNoteGlyph, ''],
    [HeavyAccentuatedNoteGlyph, ''],
  ];

  const bendRows: HelpTableRow[] = [
    [PreBendGlyph, t('bend_pre')],
    [BendGlyph, t('bend')],
    [ReleaseBendGlyph, t('bend_release')],
  ];

  const slides: HelpTableRow[] = [
    [SlideInNoteGlyph, t('slide_in')],
    [SlideNoteGlyph, t('slide')],
    [SlideOutNoteGlyph, t('slide_out')],
  ];

  return (
    <>
      <Typography variant="h6">
        Effects
      </Typography>
      <HelpTable rows={rows} />
      <Typography variant="h6">
        Harmonics
      </Typography>
      <HelpTable rows={harmonicas} />
      <Typography variant="h6">
        Bends
      </Typography>
      <HelpTable rows={bendRows} />
      <Typography variant="h6">
        Accentuation
      </Typography>
      <HelpTable rows={accentuationRows} />
      <Typography variant="h6">
        Slides
      </Typography>
      <HelpTable rows={slides} />
    </>
  );
}

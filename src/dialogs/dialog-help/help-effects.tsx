import React from 'react';
import { Typography } from '@mui/material';
import PalmMuteGlyph from '@glyphs/effects/palm-mute';
import LetRingGlyph from '@glyphs/effects/let-ring';
import GhostNoteGlyph from '@glyphs/effects/ghost-note';
import { useTranslation } from 'react-i18next';
import DeadNoteGlyph from '@glyphs/effects/dead-note';
import TapNoteGlyph from '@glyphs/effects/tap-note';
import HammerPullNoteGlyph from '@glyphs/effects/hammer-pull';
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
import HarmonicGlyph from '@glyphs/effects/harmonic/harmonic';
import HelpTable, { HelpTableRow } from './help-table';

export default function HelpEffects() {
  const { t } = useTranslation(undefined, { keyPrefix: 'help' });
  const { t: tGeneral } = useTranslation();
  const rows: HelpTableRow[] = [
    [PalmMuteGlyph, t('effects.palm_mute')],
    [LetRingGlyph, t('effects.let_ring')],
    [GhostNoteGlyph, t('effects.ghost_note')],
    [DeadNoteGlyph, t('effects.dead_note')],
    [TapNoteGlyph, t('effects.tap')],
    [HammerPullNoteGlyph, t('effects.hammer_pull')],
    [StaccatoGlyph, t('effects.staccato')],
  ];

  const harmonicas: HelpTableRow[] = [
    [HarmonicGlyph, t('harmonic.main')],
    [NaturalHarmonicGlyph, t('harmonic.natural')],
    [ArtificialHarmonicGlyph, t('harmonic.artificial')],
    [PinchHarmonicGlyph, t('harmonic.pinch')],
    [TapHarmonicGlyph, t('harmonic.tap')],
    [SemiHarmonicGlyph, t('harmonic.semi')],
    [FeedbackHarmonicGlyph, t('harmonic.feedback')],
  ];

  const accentuationRows: HelpTableRow[] = [
    [AccentuatedNoteGlyph, t('effects.accentuated')],
    [HeavyAccentuatedNoteGlyph, t('effects.accentuated_heavy')],
  ];

  const bendRows: HelpTableRow[] = [
    [PreBendGlyph, t('effects.bend_pre')],
    [BendGlyph, t('effects.bend')],
    [ReleaseBendGlyph, t('effects.bend_release')],
  ];

  const slides: HelpTableRow[] = [
    [SlideInNoteGlyph, t('effects.slide_in')],
    [SlideNoteGlyph, t('effects.slide')],
    [SlideOutNoteGlyph, t('effects.slide_out')],
  ];

  return (
    <>
      <Typography variant="h6">
        {tGeneral('Effects')}
      </Typography>
      <HelpTable rows={rows} />
      <Typography variant="h6">
        {tGeneral('Harmonics')}
      </Typography>
      <HelpTable rows={harmonicas} />
      <Typography variant="h6">
        {tGeneral('Bends')}
      </Typography>
      <HelpTable rows={bendRows} />
      <Typography variant="h6">
        {tGeneral('Accentuation')}
      </Typography>
      <HelpTable rows={accentuationRows} />
      <Typography variant="h6">
        {tGeneral('Slides')}
      </Typography>
      <HelpTable rows={slides} />
    </>
  );
}

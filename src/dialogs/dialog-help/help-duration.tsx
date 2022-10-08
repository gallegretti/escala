import React from 'react';
import HalfGlyph from '@glyphs/duration/half';
import WholeGlyph from '@glyphs/duration/whole';
import QuarterGlyph from '@glyphs/duration/quarter';
import EighthGlyph from '@glyphs/duration/eighth';
import SixTeenthGlyph from '@glyphs/duration/sixteenth';
import ThirtySecondGlyph from '@glyphs/duration/thirty-second';
import SixtyFourGlyph from '@glyphs/duration/sixty-four';
import Tie from '@glyphs/duration/tie';
import {
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import HelpTable, { HelpTableRow } from './help-table';

export default function HelpDuration() {
  const { t } = useTranslation();

  const tempos: HelpTableRow[] = [
    [WholeGlyph, '1/1'],
    [HalfGlyph, '1/2'],
    [QuarterGlyph, '1/4'],
    [EighthGlyph, '1/8'],
    [SixTeenthGlyph, '1/16'],
    [ThirtySecondGlyph, '1/32'],
    [SixtyFourGlyph, '1/64'],
    [Tie, t('help.duration.tie')],
  ];

  return (
    <>
      <Typography variant="h6">
        {t('How long the note should be played')}
      </Typography>
      <HelpTable rows={tempos} />
    </>
  );
}

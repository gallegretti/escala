import React from 'react';
import CloseRepeatGlyph from '@glyphs/beat/close-repeat';
import DownStrokeGlyph from '@glyphs/beat/downstroke';
import FermataGlyph from '@glyphs/beat/fermata';
import OpenRepeatGlyph from '@glyphs/beat/open-repeat';
import TextGlyph from '@glyphs/beat/text';
import UpstrokeGlyph from '@glyphs/beat/upstroke';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import HelpTable, { HelpTableRow } from './help-table';

export default function HelpBeat() {
  const { t } = useTranslation();
  const rows: HelpTableRow[] = [
    [TextGlyph, t('help.beat.text')],
    [FermataGlyph, t('help.beat.fermata')],
    [UpstrokeGlyph, t('help.beat.upstroke')],
    [DownStrokeGlyph, t('help.beat.downstroke')],
    [OpenRepeatGlyph, t('help.beat.open_repeat')],
    [CloseRepeatGlyph, t('help.beat.close_repeat')],
  ];
  return (
    <>
      <Typography variant="h6">
        {t('Beat')}
      </Typography>
      <HelpTable rows={rows} />
    </>
  );
}

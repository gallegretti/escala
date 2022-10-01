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
  const { t } = useTranslation(undefined, { keyPrefix: 'help.beat' });
  const rows: HelpTableRow[] = [
    [TextGlyph, t('text')],
    [FermataGlyph, t('fermata')],
    [UpstrokeGlyph, t('upstroke')],
    [DownStrokeGlyph, t('downstroke')],
    [OpenRepeatGlyph, t('open_repeat')],
    [CloseRepeatGlyph, t('close-repeat')],
  ];
  return (
    <>
      <Typography variant="h6">
        Beat
      </Typography>
      <HelpTable rows={rows} />
    </>
  );
}

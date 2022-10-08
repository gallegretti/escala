import React from 'react';
import ForteGlyph from '@glyphs/dynamics/f';
import FortissimoGlyph from '@glyphs/dynamics/ff';
import ForteFortissimoGlyph from '@glyphs/dynamics/fff';
import MezzoForteGlyph from '@glyphs/dynamics/mf';
import MezzoPianoGlyph from '@glyphs/dynamics/mp';
import PianoGlyph from '@glyphs/dynamics/p';
import PianissimoGlyph from '@glyphs/dynamics/pp';
import PianoPianissimoGlyph from '@glyphs/dynamics/ppp';
import {
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import HelpTable, { HelpTableRow } from './help-table';

export default function HelpDynamics() {
  const { t } = useTranslation();

  const dynamics: HelpTableRow[] = [
    [PianoPianissimoGlyph, t('help.dynamic.ppp')],
    [PianissimoGlyph, t('help.dynamic.pp')],
    [PianoGlyph, t('help.dynamic.p')],
    [MezzoPianoGlyph, t('help.dynamic.mp')],
    [MezzoForteGlyph, t('help.dynamic.mf')],
    [ForteGlyph, t('help.dynamic.f')],
    [FortissimoGlyph, t('help.dynamic.ff')],
    [ForteFortissimoGlyph, t('help.dynamic.fff')],
  ];
  return (
    <>
      <Typography variant="h6">
        {t('How strong the note should be played')}
      </Typography>
      <HelpTable rows={dynamics} />
    </>
  );
}

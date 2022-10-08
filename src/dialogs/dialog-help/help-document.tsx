import React from 'react';
import ExportGlyph from '@glyphs/document/export';
import InfoGlyph from '@glyphs/document/info';
import NewGlyph from '@glyphs/document/new';
import OpenGlyph from '@glyphs/document/open';
import PrintGlyph from '@glyphs/document/print';
import RedoGlyph from '@glyphs/document/redo';
import TempoGlyph from '@glyphs/document/tempo';
import UndoGlyph from '@glyphs/document/undo';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import HelpTable, { HelpTableRow } from './help-table';

export default function HelpDocument() {
  const { t } = useTranslation();

  const items: HelpTableRow[] = [
    [NewGlyph, t('help.document.new')],
    [OpenGlyph, t('help.document.open')],
    [InfoGlyph, t('help.document.info')],
    [UndoGlyph, t('help.document.undo')],
    [RedoGlyph, t('help.document.redo')],
    [PrintGlyph, t('help.document.print')],
    [ExportGlyph, t('help.document.export')],
    [TempoGlyph, t('help.document.tempo')],
  ];
  return (
    <>
      <Typography variant="h6">
        {t('Document')}
      </Typography>
      <HelpTable rows={items} />
    </>
  );
}

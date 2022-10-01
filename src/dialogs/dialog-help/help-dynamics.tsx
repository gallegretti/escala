import React from 'react';
import styled from '@emotion/styled';
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
import HelpTable, { HelpTableRow } from './help-table';

const dynamics: HelpTableRow[] = [
  [PianoPianissimoGlyph, 'dsadsa'],
  [PianissimoGlyph, '1'],
  [PianoGlyph, '2'],
  [MezzoPianoGlyph, ''],
  [MezzoForteGlyph, ''],
  [ForteGlyph, ''],
  [FortissimoGlyph, ''],
  [ForteFortissimoGlyph, ''],
];

export default function HelpDynamics() {
  return (
    <>
      <Typography variant="h6">
        How strong the note should be played
      </Typography>
      <HelpTable rows={dynamics} />
    </>
  );
}

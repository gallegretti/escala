import React from 'react';
import {
  TableContainer,
  Paper,
  TableRow,
  TableCell,
  Table,
  TableBody,
} from '@mui/material';
import { BaseGlyphProps } from '@glyphs/glyphBaseProps';

export type HelpTableRow = [React.FC<BaseGlyphProps>, string];

export default function HelpTable({ rows }: { rows: HelpTableRow[] }) {
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableBody>
          {rows.map(([Component, text]) => (
            <TableRow key={text}>
              <TableCell><Component disabled={false} selected={false} /></TableCell>
              <TableCell>{text}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

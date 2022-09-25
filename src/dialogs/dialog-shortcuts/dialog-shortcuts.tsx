import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableRow,
  TableBody,
  TableContainer,
  Paper,
  TableCell,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

interface DialogShortcutsProps {
  isOpen: boolean;
  onClose: () => void;
}

const shortcuts = [
  ['Set fret', 'Keypad'],
  ['Delete note', 'Delete'],
  ['Undo', 'Ctrl + Z'],
  ['Redo', 'Ctrl + Y'],
  ['Move cursor left', 'Left'],
  ['Move cursor right', 'Right'],
  ['Move cursor up', 'Up'],
  ['Move cursor down', 'Down'],
  ['Move cursor next bar', 'Ctrl + Right'],
  ['Move cursor previous bar', 'Ctrl + Left'],
];

export function DialogShortcuts(props: DialogShortcutsProps) {
  const { t } = useTranslation();
  return (
    <Dialog
      open={props.isOpen}
      onClose={props.onClose}
    >
      <DialogTitle>{t('Shortcuts Information')}</DialogTitle>
      <DialogContent className="score-info-content">
        <TableContainer component={Paper}>
          <Table size="small">
            <TableBody>
              {shortcuts.map(([description, key]) => (
                <TableRow key={description}>
                  <TableCell>{t(description)}</TableCell>
                  <TableCell>{t(key)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
    </Dialog>
  );
}

export default DialogShortcuts;

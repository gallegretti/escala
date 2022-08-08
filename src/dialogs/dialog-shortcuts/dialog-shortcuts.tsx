import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableContainer,
  Paper,
  TableCell,
} from '@mui/material';

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
  return (
    <Dialog
      open={props.isOpen}
      onClose={props.onClose}
    >
      <DialogTitle>Shortcuts Information</DialogTitle>
      <DialogContent className="score-info-content">
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>
                  Action
                </TableCell>
                <TableCell>
                  Key
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {shortcuts.map(([description, key]) => (
                <TableRow key={description}>
                  <TableCell>{description}</TableCell>
                  <TableCell>{key}</TableCell>
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

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
  ['set_fret', 'set_fret_shortcut'],
  ['remove_note', 'remove_note_shortcut'],
  ['undo', 'undo_shortcut'],
  ['redo', 'redo_shortcut'],
  ['move_cursor_left', 'move_cursor_left_shortcut'],
  ['move_cursor_right', 'move_cursor_right_shortcut'],
  ['move_cursor_up', 'move_cursor_up_shortcut'],
  ['move_cursor_down', 'move_cursor_down_shortcut'],
  ['move_cursor_next_bar', 'move_cursor_next_bar_shortcut'],
  ['move_cursor_previous_bar', 'move_cursor_previous_bar_shortcut'],
];

export function DialogShortcuts(props: DialogShortcutsProps) {
  const { t } = useTranslation(undefined, { keyPrefix: 'shortcuts' });
  return (
    <Dialog
      open={props.isOpen}
      onClose={props.onClose}
    >
      <DialogTitle>{t('title')}</DialogTitle>
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

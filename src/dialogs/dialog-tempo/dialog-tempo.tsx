import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button,
} from '@mui/material';

interface DialogSetTepoProps {
  isOpen: boolean;
  currentTempo: number;
  onClose: () => void;
  onSet: (arg: number) => void;
}

export default function DialogTempo(props: DialogSetTepoProps) {
  const [newTempoValue, setNewTempoValue] = useState(props.currentTempo);
  const updateNewText = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewTempoValue(Number.parseInt(event.target.value, 10));
  };

  const { t } = useTranslation();

  const cancel = () => {
    props.onClose();
  };

  const save = () => {
    props.onSet(newTempoValue ?? '');
  };

  return (
    <Dialog
      open={props.isOpen}
      onClose={props.onClose}
    >
      <DialogTitle>{t('Set tempo')}</DialogTitle>
      <DialogContent>
        <TextField
          InputProps={{
            inputProps: {
              max: 320,
              min: 30,
            },
          }}
          autoFocus
          type="number"
          value={newTempoValue ?? props.currentTempo ?? ''}
          onChange={(event) => updateNewText(event)}
        />
      </DialogContent>
      <DialogActions>
        <Button title={t('Cancel')} onClick={cancel}>{t('Cancel')}</Button>
        <Button title={t('Save')} onClick={save}>{t('Save')}</Button>
      </DialogActions>
    </Dialog>
  );
}

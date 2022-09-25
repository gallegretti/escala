import React, { useEffect, useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

interface DialogTextProps {
  isOpen: boolean,
  currentText: string | null,
  onClose: () => void,
  onSave: (arg: string) => void,
}

export default function DialogText(props: DialogTextProps) {
  const [newTextValue, setNewTextValue] = useState(props.currentText);
  const updateNewText = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewTextValue(event.target.value);
  };

  const { t } = useTranslation();

  useEffect(() => {
    setNewTextValue(props.currentText);
  }, [props.currentText]);

  const cancel = () => {
    setNewTextValue(props.currentText);
    props.onClose();
  };

  const save = () => {
    props.onSave(newTextValue ?? '');
  };

  return (
    <Dialog
      open={props.isOpen}
      onClose={props.onClose}
    >
      <DialogTitle>{t('Set text')}</DialogTitle>
      <DialogContent>
        <TextField
          id="field-beat-text"
          autoFocus
          value={newTextValue ?? ''}
          onChange={(event) => updateNewText(event)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={cancel}>{t('Cancel')}</Button>
        <Button onClick={save}>{t('Save')}</Button>
      </DialogActions>
    </Dialog>
  );
}

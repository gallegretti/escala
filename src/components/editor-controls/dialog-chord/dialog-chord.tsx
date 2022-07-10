import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button,
} from '@mui/material';
import { Chord } from '../../../alphatab-types/alphatab-types';

interface DialogChordProps {
  isOpen: boolean;
  onClose: () => void;
  chord?: Chord;
}

export default function DialogChord(props: DialogChordProps) {
  const updateChordName = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log(event.target.value);
  };

  if (!props.chord) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return (<></>);
  }
  return (
    <Dialog
      open={props.isOpen}
      onClose={props.onClose}
    >
      <DialogContent>
        <TextField
          InputProps={{
            inputProps: {
              max: 320,
              min: 30,
            },
          }}
          autoFocus
          type="text"
          value={props.chord.name ?? ''}
          onChange={(event) => updateChordName(event)}
        />
      </DialogContent>
    </Dialog>
  );
}

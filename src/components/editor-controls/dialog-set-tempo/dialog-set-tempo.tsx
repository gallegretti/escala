import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button,
} from '@mui/material';

interface DialogSetTepoProps {
    isOpen: boolean;
    currentTempo: number;
    onClose: () => void;
    onSet: (arg: number) => void;
}

export default function DialogSetTempo(props: DialogSetTepoProps) {
  const [newTempoValue, setNewTempoValue] = useState(props.currentTempo);
  const updateNewText = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewTempoValue(Number.parseInt(event.target.value, 10));
  };

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
      <DialogTitle>Set tempo</DialogTitle>
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
        <Button title="Cancel" onClick={cancel}>Cancel</Button>
        <Button title="Save" onClick={save}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}

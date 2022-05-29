import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";

interface TrackDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (params: { name: string }) => void;
}

export function TrackDialog(props: TrackDialogProps) {
  const [trackName, setTrackName] = useState("");

  const onTrackNameChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTrackName(event.target.value);
  }
  return <Dialog open={props.isOpen}>
    <DialogTitle>New Track</DialogTitle>
    <DialogContent>
      <TextField
        autoFocus
        placeholder="Untitled"
        margin="normal"
        type="text"
        label="Track name"
        value={trackName}
        onChange={(event) => onTrackNameChange(event)}
      />
    </DialogContent>
    <DialogActions>
      <Button title="Cancel" onClick={props.onClose}>Cancel</Button>
      <Button title="Save" onClick={() => props.onSave({ name: trackName })}>Save</Button>
    </DialogActions>
  </Dialog>
}


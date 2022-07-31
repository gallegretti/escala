import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { Track, Tuning } from '../../alphatab-types/alphatab-types';
import TrackInfo from '../../editor-actions/actions/edit-track/track-info';
import { defaultTuning, tunings } from '../../editor-actions/actions/edit-track/tunings';

interface TrackDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (params: TrackInfo) => void;
  currentTrack?: Track;
}

export default function TrackDialog(props: TrackDialogProps) {
  const [trackName, setTrackName] = useState('');
  const [capo, setCapo] = useState(0);
  const [tuning, setTuning] = useState<Tuning>(defaultTuning);

  useEffect(() => {
    const currentTuning = props.currentTrack?.staves[0].stringTuning;
    if (currentTuning) {
      setTuning(tunings.find((t) => t.name === currentTuning.name) ?? defaultTuning);
    }
    setTrackName(props.currentTrack?.shortName ?? 'New Track');
    setCapo(props.currentTrack?.staves[0].capo ?? 0);
  }, [props.currentTrack]);

  const onTrackNameChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTrackName(event.target.value);
  };

  const onTuningChange = (event: SelectChangeEvent<Tuning>) => {
    setTuning(event.target.value as Tuning);
  };

  const onCapoChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCapo(Number.parseInt(event.target.value, 10) || 0);
  };

  return (
    <Dialog open={props.isOpen} onClose={props.onClose}>
      <DialogTitle>{props.currentTrack ? 'Edit Track' : 'New Track'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          fullWidth
          placeholder="Untitled"
          margin="normal"
          type="text"
          label="Track name"
          value={trackName}
          onChange={onTrackNameChange}
        />
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Tuning Preset</InputLabel>
            <Select<Tuning>
              labelId="demo-simple-select-label"
              id="demo-simple-select-label"
              fullWidth
              label="Tuning Preset"
              onChange={onTuningChange}
              value={tuning}
            >
              {tunings.map((t) => (
                <MenuItem value={t as any} key={t.name}>{t.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            style={{ width: '100px' }}
            label="Capo"
            type="number"
            value={capo}
            onChange={onCapoChange}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button title="Cancel" onClick={props.onClose}>Cancel</Button>
        <Button title="Save" onClick={() => props.onSave({ name: trackName, capo, tuning })}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}

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
import { useTranslation } from 'react-i18next';
import { Track, Tuning } from '../../alphatab-types/alphatab-types';
import TrackInfo from '../../editor-actions/actions/edit-track/track-info';
import { defaultTuning, tunings } from '../../editor-actions/actions/edit-track/tunings';

interface DialogTrackProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (params: TrackInfo) => void;
  currentTrack?: Track;
}

export default function DialogTrack(props: DialogTrackProps) {
  const [trackName, setTrackName] = useState('');
  const [capo, setCapo] = useState(0);
  const [tuning, setTuning] = useState<Tuning>(defaultTuning);

  const { t } = useTranslation();

  useEffect(() => {
    const currentTuning = props.currentTrack?.staves[0].stringTuning;
    if (currentTuning) {
      setTuning(tunings.find((availableTuning) => availableTuning.name === currentTuning.name) ?? defaultTuning);
    }
    setTrackName(props.currentTrack?.shortName ?? t('New Track'));
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
      <DialogTitle>{props.currentTrack ? t('Edit Track') : t('New Track')}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          fullWidth
          placeholder="Untitled"
          margin="normal"
          type="text"
          label={t('Track name')}
          value={trackName}
          onChange={onTrackNameChange}
        />
        <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: '12px' }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">{t('Tuning Preset')}</InputLabel>
            <Select<Tuning>
              labelId="demo-simple-select-label"
              id="demo-simple-select-label"
              fullWidth
              label={t('Tuning Preset')}
              onChange={onTuningChange}
              value={tuning}
            >
              {tunings.map((availableTuning) => (
                <MenuItem value={availableTuning as any} key={availableTuning.name}>{availableTuning.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            style={{ width: '100px', marginLeft: '12px' }}
            label={t('Capo')}
            type="number"
            InputProps={{
              inputProps: {
                min: 0,
              },
            }}
            value={capo}
            onChange={onCapoChange}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button title={t('Cancel')} onClick={props.onClose}>{t('Cancel')}</Button>
        <Button title={t('Save')} onClick={() => props.onSave({ name: trackName, capo, tuning })}>{t('Save')}</Button>
      </DialogActions>
    </Dialog>
  );
}

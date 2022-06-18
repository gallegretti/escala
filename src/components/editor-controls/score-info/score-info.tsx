import React, { useState } from 'react';
import './score-info';
import {
  Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button,
} from '@mui/material';
import { ScoreInfo } from '../../../editor/editor-actions/actions/set-score-info/score-info';
import { Score } from '../../../alphatab-types/alphatab-types';

interface ScoreInfoProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (scoreInfo: ScoreInfo) => void;
    score: Score;
}

export function ScoreInfoComponent(props: ScoreInfoProps) {
  const stateFromProps = () => ({
    title: props.score?.title ?? '',
    subTitle: props.score?.subTitle ?? '',
    artist: props.score?.artist ?? '',
    album: props.score?.album ?? '',
    notices: props.score.notices ?? '',
    words: props.score.words ?? '',
    tab: props.score.tab ?? '',
  });

  const [state, setState] = useState(stateFromProps());

  const handleChange = (e: any) => {
    const propertyName = e.target.name as keyof ScoreInfo;
    const propertyValue = e.target.value as string;
    const newState: Partial<ScoreInfo> = {
      [propertyName]: propertyValue,
    };
    setState({ ...state, ...newState });
  };

  const onSave = () => {
    props.onSave(state);
  };

  const onCancel = () => {
    setState(stateFromProps());
    props.onClose();
  };

  return (
    <Dialog
      className="score-info"
      open={props.isOpen}
      onClose={props.onClose}
    >
      <DialogTitle>Score Information</DialogTitle>
      <DialogContent className="score-info-content">
        <TextField id="field-title" fullWidth margin="normal" variant="outlined" name="title" label="Title" onChange={handleChange} value={state.title} />
        <TextField id="field-subtitle" fullWidth margin="normal" variant="outlined" name="subTitle" label="Subtitle" onChange={handleChange} value={state.subTitle} />
        <TextField id="field-artist" fullWidth margin="normal" variant="outlined" name="artist" label="Artist" onChange={handleChange} value={state.artist} />
        <TextField id="field-album" fullWidth margin="normal" variant="outlined" name="album" label="Album" onChange={handleChange} value={state.album} />
        <TextField id="field-tab-creator" fullWidth margin="normal" variant="outlined" name="tab" label="Tab Creator" onChange={handleChange} value={state.tab} />
        <TextField id="field-comments" fullWidth margin="normal" variant="outlined" name="notices" label="Comments" onChange={handleChange} value={state.notices} />
        <TextField id="field-composer" fullWidth margin="normal" variant="outlined" name="words" label="Composer" onChange={handleChange} value={state.words} />
      </DialogContent>
      <DialogActions>
        <Button title="Save" onClick={onSave}>Save</Button>
        <Button title="Cancel" onClick={onCancel}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ScoreInfoComponent;

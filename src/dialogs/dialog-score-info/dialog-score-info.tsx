import React, { useState } from 'react';
import './dialog-score-info';
import {
  Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ScoreInfo } from '../../editor-actions/actions/set-score-info/score-info';
import { Score } from '../../alphatab-types/alphatab-types';

interface ScoreInfoProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (scoreInfo: ScoreInfo) => void;
  score: Score;
}

export function DialogScoreInfo(props: ScoreInfoProps) {
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

  const { t } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const propertyName = e.target.name as keyof ScoreInfo;
    const propertyValue = e.target.value;
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
      <DialogTitle>{t('Score Information')}</DialogTitle>
      <DialogContent className="score-info-content">
        <TextField
          id="field-title"
          fullWidth
          margin="normal"
          variant="outlined"
          name="title"
          label={t('Title')}
          onChange={handleChange}
          value={state.title}
        />
        <TextField
          id="field-subtitle"
          fullWidth
          margin="normal"
          variant="outlined"
          name="subTitle"
          label={t('Subtitle')}
          onChange={handleChange}
          value={state.subTitle}
        />
        <TextField
          id="field-artist"
          fullWidth
          margin="normal"
          variant="outlined"
          name="artist"
          label={t('Artist')}
          onChange={handleChange}
          value={state.artist}
        />
        <TextField
          id="field-album"
          fullWidth
          margin="normal"
          variant="outlined"
          name="album"
          label={t('Album')}
          onChange={handleChange}
          value={state.album}
        />
        <TextField
          id="field-tab-creator"
          fullWidth
          margin="normal"
          variant="outlined"
          name="tab"
          label={t('Tab Creator')}
          onChange={handleChange}
          value={state.tab}
        />
        <TextField
          id="field-comments"
          fullWidth
          margin="normal"
          variant="outlined"
          name="notices"
          label={t('Comments')}
          onChange={handleChange}
          value={state.notices}
        />
        <TextField
          id="field-composer"
          fullWidth
          margin="normal"
          variant="outlined"
          name="words"
          label={t('Composer')}
          onChange={handleChange}
          value={state.words}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onSave}>{t('Save')}</Button>
        <Button onClick={onCancel}>{t('Cancel')}</Button>
      </DialogActions>
    </Dialog>
  );
}

export default DialogScoreInfo;

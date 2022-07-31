import React from 'react';
import { styled } from '@mui/material';
import useDialog from '@hooks/use-dialog';
import EditorTrackSelector from './editor-track-selector/editor-track-selector';
import { Score, Track } from '../alphatab-types/alphatab-types';
import TrackDialog from './tracks/track-dialog';
import TrackInfo from '../editor/editor-actions/actions/edit-track.ts/track-info';

const SideMenuDiv = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  width: '90px',
  display: 'flex',
  alignContent: 'stretch',
  zIndex: '1001',
  overflow: 'hidden',
  borderRight: '1px solid rgba(0, 0, 0, 0.12)',
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : 'inherit',
}));

interface EditorLeftMenuProps {
  onNewTrack: (params: TrackInfo) => void;
  onTrackEdit: (track: Track, params: TrackInfo) => void;
  score: Score | null;
  selectedTrackIndex: number;
  selectTrack: (track: Track) => void;
}

export default function EditorLeftMenu({
  score, selectedTrackIndex, selectTrack, onNewTrack, onTrackEdit,
}: EditorLeftMenuProps) {
  const {
    closeDialog,
    isDialogOpen,
    openDialog,
  } = useDialog();

  const onSave = (params: TrackInfo) => {
    onTrackEdit(score?.tracks[selectedTrackIndex]!, params);
    closeDialog();
  };

  const onSelectTrack = (track: Track) => {
    openDialog();
  };

  return (
    <>
      <TrackDialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        currentTrack={score?.tracks[selectedTrackIndex]}
        onSave={onSave}
      />
      <SideMenuDiv>
        {score?.tracks
          && (
            <EditorTrackSelector
              onNewTrack={openDialog}
              selectedTrackIndex={selectedTrackIndex}
              onTrackSelected={onSelectTrack}
              tracks={score?.tracks}
            />
          )}
      </SideMenuDiv>
    </>
  );
}

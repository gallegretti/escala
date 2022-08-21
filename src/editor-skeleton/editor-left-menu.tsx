import React from 'react';
import { styled } from '@mui/material';
import useDialog from '@hooks/use-dialog';
import EditorTrackSelector from './editor-track-selector/editor-track-selector';
import { Score, Track } from '../alphatab-types/alphatab-types';
import DialogTrack from '../dialogs/dialog-track/dialog-track';
import TrackInfo from '../editor-actions/actions/edit-track/track-info';

const SideMenuDiv = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  width: '120px',
  display: 'flex',
  alignContent: 'stretch',
  zIndex: '1001',
  overflow: 'hidden',
  borderRight: '1px solid rgba(0, 0, 0, 0.12)',
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : 'inherit',
}));

interface EditorLeftMenuProps {
  onNewTrack: (params: TrackInfo) => void;
  onRemoveTrack: (track: Track) => void;
  onTrackEdit: (track: Track, params: TrackInfo) => void;
  tracks: Track[] | null;
  selectedTrackIndex: number;
  selectTrack: (track: Track) => void;
}

export default function EditorLeftMenu({
  tracks, selectedTrackIndex, selectTrack, onNewTrack, onTrackEdit, onRemoveTrack,
}: EditorLeftMenuProps) {
  const {
    closeDialog,
    isDialogOpen,
    openDialog,
  } = useDialog();

  const onSave = (params: TrackInfo) => {
    if (tracks) {
      onTrackEdit(tracks[selectedTrackIndex], params);
    }
    closeDialog();
  };

  const onSelectTrack = (track: Track) => {
    // openDialog();
    selectTrack(track);
  };

  const onEditTrack = (track: Track) => {
    openDialog();
  }

  return (
    <>
      {tracks && (
        <DialogTrack
          isOpen={isDialogOpen}
          onClose={closeDialog}
          currentTrack={tracks[selectedTrackIndex]}
          onSave={onSave}
        />
      )}
      <SideMenuDiv>
        {tracks
          && (
            <EditorTrackSelector
              onNewTrack={openDialog}
              selectedTrackIndex={selectedTrackIndex}
              onTrackSelected={onSelectTrack}
              onTrackEdit={onEditTrack}
              onTrackRemove={onRemoveTrack}
              tracks={tracks}
            />
          )}
      </SideMenuDiv>
    </>
  );
}

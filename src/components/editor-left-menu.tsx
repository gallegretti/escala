import React from 'react';
import { styled } from '@mui/material';
import EditorTrackSelector from './editor-track-selector/editor-track-selector';
import { Score, Track } from '../alphatab-types/alphatab-types';
import TrackDialog from './tracks/track-dialog';
import useDialog from './editor-controls/use-dialog';

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
    onNewTrack: (params: { name: string }) => void;
    score: Score | null;
    selectedTrackIndex: number;
    selectTrack: (track: Track) => void;
}

export function EditorLeftMenu({
  score, selectedTrackIndex, selectTrack, onNewTrack,
}: EditorLeftMenuProps) {
  const {
    closeDialog,
    isDialogOpen,
    openDialog,
  } = useDialog();

  return (
    <>
      <TrackDialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        onSave={(params) => { onNewTrack(params); closeDialog(); }}
      />
      <SideMenuDiv>
        {score?.tracks
                    && (
                    <EditorTrackSelector
                      onNewTrack={openDialog}
                      selectedTrackIndex={selectedTrackIndex}
                      onTrackSelected={selectTrack}
                      tracks={score?.tracks}
                    />
                    )}
      </SideMenuDiv>
    </>
  );
}

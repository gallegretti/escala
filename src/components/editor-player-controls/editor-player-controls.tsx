import React, { useState } from 'react';
import { styled } from '@mui/material';
import PlayPauseGlyph from '../editor-controls/icons/player-controls/play';
import VolumeControlComponent from './volume-control';
import EditorPlayerSpeedComponent from './editor-player-speed';
import CountInGlyph from '../editor-controls/icons/player-controls/count-in';

interface EditorPlayerControlsProps {
    playPause: () => void,
    isPlaying: boolean,
    isCountIn: boolean,
    onCountInChange: (countIn: boolean) => void,
    onVolumeChange: (volume: number) => void,
    onSpeedChange: (speed: number) => void,
}

const EditorPlayerControlsDiv = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[100],
}));

const EditorPlayerControlsLeft = styled('div')({
  width: '33%',
});

const EditorPlayerControlsMid = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '33%',
});

const EditorPlayerControlsRight = styled('div')({
  width: '33%',
  gap: '10px',
  display: 'flex',
  justifyContent: 'right',
  alignItems: 'center',
});

export default function EditorPlayerControls(props: EditorPlayerControlsProps) {
  const [currentVolume, setCurrentVolume] = useState(0.5);
  const [currentSpeed, setCurrentSpeed] = useState(1);

  const setVolume = (volume: number) => {
    setCurrentVolume(volume);
    props.onVolumeChange(volume);
  };

  const setSpeed = (speed: number) => {
    setCurrentSpeed(speed);
    props.onSpeedChange(speed);
  };

  return (
    <EditorPlayerControlsDiv>
      <EditorPlayerControlsLeft />
      <EditorPlayerControlsMid>
        <PlayPauseGlyph selected={props.isPlaying} onClick={props.playPause} disabled={false} />
      </EditorPlayerControlsMid>
      <EditorPlayerControlsRight>
        <CountInGlyph
          selected={props.isCountIn}
          onClick={() => props.onCountInChange(!props.isCountIn)}
          disabled={false}
        />
        <VolumeControlComponent volume={currentVolume} setVolume={setVolume} />
        <EditorPlayerSpeedComponent speed={currentSpeed} onChangeSpeed={setSpeed} />
      </EditorPlayerControlsRight>
    </EditorPlayerControlsDiv>
  );
}

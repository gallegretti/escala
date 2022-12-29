import React, { useState } from 'react';
import { styled } from '@mui/material';
import PlayPauseGlyph from '@glyphs/player-controls/play';
import CountInGlyph from '@glyphs/player-controls/count-in';
import MetronomeGlyph from '@glyphs/player-controls/metronome';
import RepeatGlyph from '@glyphs/player-controls/repeat';
import VolumeControlComponent from './volume-control';
import EditorPlayerSpeedComponent from './editor-player-speed';

interface EditorPlayerControlsProps {
  playPause: () => void;
  isPlaying: boolean;
  isCountIn: boolean;
  isMetronome: boolean;
  isLooping: boolean;
  onLoopingChange: (isLooping: boolean) => void;
  onCountInChange: (countIn: boolean) => void;
  onMetronomeChange: (metronome: boolean) => void;
  onVolumeChange: (volume: number) => void;
  onSpeedChange: (speed: number) => void;
}

const EditorPlayerControlsDiv = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '65px',
  paddingLeft: '10px',
  paddingRight: '10px',
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[100],
}));

const EditorPlayerControlsLeft = styled('div')({
  width: '40%',
});

const EditorPlayerControlsMid = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '20%',
});

const EditorPlayerControlsRight = styled('div')({
  width: '40%',
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
        <MetronomeGlyph
          selected={props.isMetronome}
          onClick={() => props.onMetronomeChange(!props.isMetronome)}
          disabled={false}
        />
        <RepeatGlyph
          selected={props.isLooping}
          onClick={() => props.onLoopingChange(!props.isLooping)}
          disabled={false}
        />
        <VolumeControlComponent volume={currentVolume} setVolume={setVolume} />
        <EditorPlayerSpeedComponent speed={currentSpeed} onChangeSpeed={setSpeed} />
      </EditorPlayerControlsRight>
    </EditorPlayerControlsDiv>
  );
}

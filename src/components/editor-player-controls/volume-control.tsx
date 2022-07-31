/* eslint-disable max-len */
import React, { useState } from 'react';
import { Slider, styled } from '@mui/material';
import VolumeGlyph from '@glyphs/player-controls/volume';

interface VolumeControlProps {
    volume: number,
    setVolume: (arg: number) => void,
}

const VolumeControlsDiv = styled('div')(() => ({
  display: 'flex',
  width: '140px',
  gap: '20px',
  alignItems: 'center',
}));

export default function VolumeControlComponent(props: VolumeControlProps) {
  const [previousVolume, setPreviousVolume] = useState(0.5);

  const volumeOff = () => {
    props.setVolume(0);
  };

  const volumeOn = () => {
    const newVolume = previousVolume === 0 ? 0.5 : previousVolume;
    props.setVolume(newVolume);
  };

  const setVolume = (volume: number) => {
    setPreviousVolume(props.volume);
    props.setVolume(volume);
  };

  const toggleVolume = () => {
    if (props.volume !== 0) {
      volumeOff();
    } else {
      volumeOn();
    }
  };

  return (
    <VolumeControlsDiv>
      <VolumeGlyph
        selected={props.volume !== 0}
        disabled={false}
        onClick={toggleVolume}
      />
      <Slider
        size="small"
        value={props.volume}
        min={0}
        max={1}
        step={0.05}
        onChange={(event, volume) => setVolume(volume as number)}
      />
    </VolumeControlsDiv>
  );
}

import React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

interface EditorPlayerSpeedProps {
  onChangeSpeed: (speed: number) => void,
  speed: number
}

export default function EditorPlayerSpeedComponent(props: EditorPlayerSpeedProps) {
  return (
    <Select
      label="Speed"
      size="small"
      value={props.speed}
      onChange={(event) => props.onChangeSpeed(event.target.value as number)}
    >
      <MenuItem value={0.25}>0.25x</MenuItem>
      <MenuItem value={0.5}>0.5x</MenuItem>
      <MenuItem value={0.75}>0.75x</MenuItem>
      <MenuItem value={1}>1x</MenuItem>
      <MenuItem value={1.25}>1.25x</MenuItem>
      <MenuItem value={1.5}>1.5x</MenuItem>
      <MenuItem value={1.75}>1.75x</MenuItem>
      <MenuItem value={2}>2x</MenuItem>
    </Select>
  );
}

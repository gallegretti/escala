import React from 'react';
import {
  List, ListItem, ListItemButton, ListItemText, styled,
} from '@mui/material';
import { Track } from '../../alphatab-types/alphatab-types';
import baseSvgStyle from '../editor-controls/icons/glyphBaseSvgStyle';
import { useGlyphColor } from '../editor-controls/icons/glyphColor';

interface EditorTrackSelectorProps {
    tracks: Track[];
    selectedTrackIndex: number;
    onTrackSelected: (track: Track) => void;
    onNewTrack: () => void;
}

const ListItemStyled = styled(ListItemText)(({ theme }) => ({
  color: theme.palette.mode === 'dark' ? 'white' : 'black',
}));

export default function EditorTrackSelector(props: EditorTrackSelectorProps) {
  return (
    <List style={{ width: '100%' }} disablePadding>
      {props.tracks.map((track, i) => (
        <ListItem selected={props.selectedTrackIndex === i} key={track.index} onClick={() => props.onTrackSelected(track)} disablePadding>
          <ListItemButton>
            <ListItemStyled>
              {track.shortName || track.name || 'Unamed'}
            </ListItemStyled>
          </ListItemButton>
        </ListItem>
      ))}
      {/*
            <ListItem onClick={() => props.onNewTrack()} style={{ display: 'flex', justifyContent: 'center' }}>
                <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48" style={baseSvgStyle({ disabled: false })}>
                    <path fill={useGlyphColor({ disabled: false, selected: false })} d="M22.5 38V25.5H10V22.5H22.5V10H25.5V22.5H38V25.5H25.5V38Z"/>
                </svg>
            </ListItem>
            */}
    </List>
  );
}

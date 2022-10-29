import React, { useState } from 'react';
import {
  List,
} from '@mui/material';
import { Track } from '../../alphatab-types/alphatab-types';
import EditorTrackItem from './editor-track-item';

interface EditorTrackSelectorProps {
  tracks: Track[];
  selectedTrackIndex: number;
  onTrackSelected: (track: Track) => void;
  onTrackEdit: (track: Track) => void;
  onTrackRemove: (track: Track) => void;
  // eslint-disable-next-line react/no-unused-prop-types
  onNewTrack: () => void;
}

export default function EditorTrackSelector(props: EditorTrackSelectorProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <List style={{ width: '100%' }} disablePadding>
      {props.tracks.map((track, i) => (
        <EditorTrackItem
          isExpanded={i === expandedIndex}
          canDelete={props.tracks.length > 1}
          onExpand={(v) => { setExpandedIndex(v ? i : null) }}
          key={track.index}
          track={track}
          isSelected={props.selectedTrackIndex === i}
          onSelect={() => { props.onTrackSelected(props.tracks[i]) }}
          onEdit={() => props.onTrackEdit(track)}
          onRemove={() => props.onTrackRemove(track)}
        />
      ))}
    </List>
  );
}

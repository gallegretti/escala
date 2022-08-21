import React, { useState } from 'react';
import ExpandMoreGlyph from '@glyphs/generic/expand-more';
import {
  Collapse,
  ListItem,
  ListItemButton,
  ListItemText,
  styled,
  useThemeProps,
} from '@mui/material';
import EditGlyph from '@glyphs/generic/edit';
import { Track } from '../../alphatab-types/alphatab-types';

const ListItemStyled = styled(ListItemText)(({ theme }) => ({
  color: theme.palette.mode === 'dark' ? 'white' : 'black',
}));

type EditorTrackItemProps = {
  isSelected: boolean;
  isExpanded: boolean;
  onExpand: (v: boolean) => void;
  onSelect: () => void;
  onEdit: () => void;
  track: Track;
};

export default function EditorTrackItem({
  isSelected,
  onSelect,
  onEdit,
  track,
  isExpanded,
  onExpand,
}: EditorTrackItemProps) {
  return (
    <>
      <ListItem
        selected={isSelected}
        onClick={onSelect}
        disablePadding
      >
        <ListItemButton>
          <ListItemStyled>
            {track.shortName || track.name || 'Unamed'}
          </ListItemStyled>
          <ExpandMoreGlyph
            onClick={() => { onExpand(!isExpanded) }}
            selected={false}
            disabled={false}
          />
        </ListItemButton>
      </ListItem>
      <Collapse in={isExpanded}>
        <div style={{ paddingLeft: '10px' }}>
          <EditGlyph disabled={false} selected={false} onClick={onEdit} />
        </div>
      </Collapse>
    </>
  );
}

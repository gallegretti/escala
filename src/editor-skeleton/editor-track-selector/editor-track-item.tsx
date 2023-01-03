import React from 'react';
import ExpandMoreGlyph from '@glyphs/generic/expand-more';
import ExpandLessGlyph from '@glyphs/generic/expand-less';
import {
  Collapse,
  ListItem,
  ListItemButton,
  ListItemText,
  styled,
} from '@mui/material';
import EditGlyph from '@glyphs/generic/edit';
import DeleteGlyph from '@glyphs/generic/delete';
import { Track } from '../../alphatab-types/alphatab-types';

const ListItemStyled = styled(ListItemText)(({ theme }) => ({
  color: theme.palette.mode === 'dark' ? 'white' : 'black',
}));

type EditorTrackItemProps = {
  isSelected: boolean;
  isExpanded: boolean;
  canDelete: boolean;
  onExpand: (v: boolean) => void;
  onSelect: () => void;
  onEdit: () => void;
  onRemove: () => void;
  track: Track;
};

export default function EditorTrackItem({
  isSelected,
  onSelect,
  onEdit,
  track,
  isExpanded,
  canDelete,
  onExpand,
  onRemove,
}: EditorTrackItemProps) {
  const ExpandGlyph = isExpanded ? ExpandLessGlyph : ExpandMoreGlyph;
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
          <ExpandGlyph
            onClick={() => { onExpand(!isExpanded) }}
            extraSvgStyles={{ flexShrink: 0 }}
            selected={false}
            disabled={false}
          />
        </ListItemButton>
      </ListItem>
      <Collapse in={isExpanded}>
        <div style={{ paddingLeft: '16px', display: 'flex', gap: '10px' }}>
          <EditGlyph disabled={false} selected={false} onClick={onEdit} />
          <DeleteGlyph disabled={!canDelete} selected={false} onClick={canDelete ? onRemove : undefined} />
        </div>
      </Collapse>
    </>
  );
}

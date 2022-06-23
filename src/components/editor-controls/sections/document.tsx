import React from 'react';
import { Divider } from '@mui/material';
import OpenGlyph from '../icons/document/open';
import InfoGlyph from '../icons/document/info';
import UndoGlyph from '../icons/document/undo';
import RedoGlyph from '../icons/document/redo';
import PrintGlyph from '../icons/document/print';
import ExportGlyph from '../icons/document/export';
import useAnchorElem from '../components/use-anchor-element';
import { StyledPopper } from '../components/styled-popper';
import GuitarProGlyph from '../icons/document/download/guitar-pro';
import MidGlyph from '../icons/document/download/mid';
import NewGlyph from '../icons/document/new';
import TempoGlyph from '../icons/document/tempo';

interface DocumentSectionProps {
    canUndo: boolean;
    canRedo: boolean;
    tempo: number | null;
    undo: () => void;
    redo: () => void;
    openFile: (file: File) => void;
    newFile: () => void;
    print: () => void;
    exportGuitarPro: () => void;
    exportMidi: () => void;
    openScoreInfo: () => void;
    openTempoDialog: () => void;
}

export default function DocumentSection(props: DocumentSectionProps) {
  const [anchorElem, setAnchorElement] = useAnchorElem();

  const onClick = (e: any) => {
    if (anchorElem !== null) {
      setAnchorElement(null);
    } else {
      setAnchorElement(e);
    }
  };

  return (
    <>
      <NewGlyph id="new" disabled={false} selected={false} onClick={props.newFile} />
      <input
        id="open-input"
        style={{ display: 'none' }}
        type="file"
        accept=".gp,.gp3,.gp4,.gp5,.gpx,.musicxml,.mxml,.xml,.capx"
        onChange={(f) => { props.openFile(f.target?.files?.[0]!); }}
      />
      <label htmlFor="open-input">
        <OpenGlyph id="open" disabled={false} selected={false} onClick={() => {}} />
      </label>
      <Divider variant="middle" orientation="vertical" flexItem />
      <InfoGlyph id="info" disabled={false} selected={false} onClick={props.openScoreInfo} />
      <Divider variant="middle" orientation="vertical" flexItem />
      <UndoGlyph id="undo" disabled={!props.canUndo} selected={false} onClick={props.undo} />
      <RedoGlyph id="redo" disabled={!props.canRedo} selected={false} onClick={props.redo} />
      <Divider variant="middle" orientation="vertical" flexItem />
      <PrintGlyph id="print" disabled={false} selected={false} onClick={props.print} />
      <ExportGlyph hideTooltip={anchorElem !== null} selected={false} disabled={false} onClick={onClick} />
      <StyledPopper open={anchorElem !== null} anchorEl={anchorElem} disablePortal>
        <GuitarProGlyph id="guitar-pro" disabled={false} selected={false} onClick={props.exportGuitarPro} />
        <MidGlyph id="midi" disabled={false} selected={false} onClick={props.exportMidi} />
      </StyledPopper>
      <Divider variant="middle" orientation="vertical" flexItem />
      <TempoGlyph id="new" disabled={false} selected={false} onClick={props.openTempoDialog} />
    </>
  );
}

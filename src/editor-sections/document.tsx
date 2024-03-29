import React from 'react';
import OpenGlyph from '@glyphs/document/open';
import InfoGlyph from '@glyphs/document/info';
import UndoGlyph from '@glyphs/document/undo';
import RedoGlyph from '@glyphs/document/redo';
import PrintGlyph from '@glyphs/document/print';
import ExportGlyph from '@glyphs/document/export';
import GuitarProGlyph from '@glyphs/document/download/guitar-pro';
import MidGlyph from '@glyphs/document/download/mid';
import NewGlyph from '@glyphs/document/new';
import TempoGlyph from '@glyphs/document/tempo';
import useAnchorElem from '@hooks/use-anchor-element';
import StyledPopper from '@editor-section-part/styled-popper';
import SectionDivider from './section-divider';

interface DocumentSectionProps {
  canUndo: boolean;
  canRedo: boolean;
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
      <label style={{ height: '24px' }} htmlFor="open-input">
        <input
          id="open-input"
          style={{ display: 'none' }}
          type="file"
          accept=".gp,.gp3,.gp4,.gp5,.gpx,.musicxml,.mxml,.xml,.capx"
          onChange={(f) => {
            const firstFile = f.target?.files?.[0];
            if (firstFile) {
              props.openFile(firstFile);
            }
          }}
        />
        <OpenGlyph id="open" disabled={false} selected={false} onClick={() => { /* Handled by the input element */ }} />
      </label>
      <SectionDivider />
      <InfoGlyph id="info" disabled={false} selected={false} onClick={props.openScoreInfo} />
      <SectionDivider />
      <UndoGlyph id="undo" disabled={!props.canUndo} selected={false} onClick={props.undo} />
      <RedoGlyph id="redo" disabled={!props.canRedo} selected={false} onClick={props.redo} />
      <SectionDivider />
      <PrintGlyph id="print" disabled={false} selected={false} onClick={props.print} />
      <ExportGlyph hideTooltip={anchorElem !== null} selected={false} disabled={false} onClick={onClick} />
      <StyledPopper open={anchorElem !== null} anchorEl={anchorElem} disablePortal>
        <GuitarProGlyph id="guitar-pro" disabled={false} selected={false} onClick={props.exportGuitarPro} />
        <MidGlyph id="midi" disabled={false} selected={false} onClick={props.exportMidi} />
      </StyledPopper>
      <SectionDivider />
      <TempoGlyph id="new" disabled={false} selected={false} onClick={props.openTempoDialog} />
    </>
  );
}

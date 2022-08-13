import React, { useState } from 'react';
import {
  Tabs, Tab, useTheme, styled,
} from '@mui/material';
import DarkModeGlyph from '@glyphs/settings/dark-mode';
import useDialog from '@hooks/use-dialog';
import DialogText from '@dialogs/dialog-text/dialog-text';
import DialogScoreInfo from '@dialogs/dialog-score-info/dialog-score-info';
import DialogTempo from '@dialogs/dialog-tempo/dialog-tempo';
import DialogShortcuts from '@dialogs/dialog-shortcuts/dialog-shortcuts';
import KeyboardGlyph from '@glyphs/document/keyboard';
import { ScoreInfo } from '../../editor-actions/actions/set-score-info/score-info';
import { BendType } from '../../alphatab-types/bend-type';
import { ColorModeContext } from '../../editor/color-mode-context';
import DynamicsSection from '../../editor-sections/dynamics';
import DurationSetion from '../../editor-sections/duration';
import BeatSection from '../../editor-sections/beat';
import EffectsSection from '../../editor-sections/effects';
import DocumentSection from '../../editor-sections/document';

import {
  Chord, Score,
} from '../../alphatab-types/alphatab-types';
import DialogChord from '../../dialogs/dialog-chord/dialog-chord';
import EditorActionDispatcher from '../../editor/editor-action-dispatcher';
import EditorScoreState from '../../editor/editor-score-state';

export interface BendState {
  preBend: BendType;
  bend: BendType;
  release: BendType
}

interface EditorControlsProps {
  editorScoreState: EditorScoreState,
  actionDispatcher: EditorActionDispatcher,
  // Undo/Redo
  canUndo: boolean,
  canRedo: boolean,
  // Selection state
  selectedTrackIndex: number,
  currentAvailableChords: Chord[],
  score: Score | null,
  // Others
  print: () => void,
  exportGuitarPro: () => void,
  exportMidi: () => void,
  open: (file: File) => void,
  newFile: () => void,
}

export default function EditorControls(props: EditorControlsProps) {
  const [currentTab, setCurrentTab] = useState(0);

  const {
    openDialog: openTextDialog,
    closeDialog: closeTextDialog,
    isDialogOpen: isTextDialogOpen,
  } = useDialog();

  const {
    openDialog: openScoreInfoDialog,
    closeDialog: closeScoreInfoDialog,
    isDialogOpen: isScoreInfoDialogOpen,
  } = useDialog();

  const {
    openDialog: openTempoDialog,
    closeDialog: closeTempoDialog,
    isDialogOpen: isTempoDialogOpen,
  } = useDialog();

  const {
    openDialog: openChordDialog,
    closeDialog: closeChordDialog,
    isDialogOpen: isChordDialogOpen,
  } = useDialog();

  const {
    openDialog: openShortcutsDialog,
    closeDialog: closeShortcutsDialog,
    isDialogOpen: isShortcutsDialogOpen,
  } = useDialog();

  const saveNewText = (newText: string) => {
    props.actionDispatcher.setText(newText);
    closeTextDialog();
  };

  const saveNewScoreInfo = (scoreInfo: ScoreInfo) => {
    closeScoreInfoDialog();
    props.actionDispatcher.setScoreInfo(scoreInfo);
  };

  const saveChord = (chord: Chord) => {
    closeChordDialog();
    props.actionDispatcher.setChord(chord);
  };

  const saveTempo = (tempo: number) => {
    closeTempoDialog();
    props.actionDispatcher.setTempo(tempo);
  };

  const colorMode = React.useContext(ColorModeContext);

  const TabContainer = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[100],
    borderTopColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : '#ede9e9',
    height: '45px',
    display: currentTab !== 3 ? 'none' : 'flex',
    alignItems: 'center',
    gap: '10px',
    paddingLeft: '10px',
    paddingRight: '10px',
    boxShadow: `0 4px 2px -2px ${theme.palette.mode === 'dark' ? '#312f2f' : '#e6e6e6'}`,
  }));

  const numberOfStrings = props.score?.tracks[props.selectedTrackIndex]?.staves[0]?.stringTuning.tunings.length ?? 6;

  const theme = useTheme();

  const backgroundColor = theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[100];
  const borderColor = theme.palette.mode === 'dark' ? theme.palette.grey[900] : '#ede9e9';

  return (
    <div>
      <DialogText
        isOpen={isTextDialogOpen}
        currentText={props.editorScoreState.currentSelectedBeatText}
        onClose={closeTextDialog}
        onSave={saveNewText}
      />
      {props.score && (
        <DialogTempo
          currentTempo={props.score?.tempo ?? 0}
          isOpen={isTempoDialogOpen}
          onClose={closeTempoDialog}
          onSet={saveTempo}
        />
      )}
      {props.score && (
        <DialogScoreInfo
          isOpen={isScoreInfoDialogOpen}
          score={props.score}
          onClose={closeScoreInfoDialog}
          onSave={saveNewScoreInfo}
        />
      )}
      <DialogShortcuts
        isOpen={isShortcutsDialogOpen}
        onClose={closeShortcutsDialog}
      />
      <DialogChord
        isOpen={isChordDialogOpen}
        chord={props.editorScoreState.currentChord}
        numberOfStrings={numberOfStrings}
        onClose={closeChordDialog}
        onSave={saveChord}
      />
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        paddingRight: '10px',
        alignItems: 'center',
        backgroundColor,
        borderBottom: `1px solid ${borderColor}`,
      }}
      >
        <Tabs style={{ backgroundColor }} value={currentTab} onChange={(e, v) => setCurrentTab(v)}>
          <Tab label="Document" />
          <Tab label="Effects" />
          <Tab label="Beat" />
          <Tab label="Duration" />
          <Tab label="Dynamics" />
        </Tabs>
        <div style={{ backgroundColor, display: 'flex', gap: '10px' }}>
          <KeyboardGlyph disabled={false} selected={false} onClick={() => { openShortcutsDialog(); }} />
          <DarkModeGlyph disabled={false} selected={false} onClick={() => { colorMode.toggleColorMode(); }} />
        </div>
      </div>
      <div>
        <TabContainer style={{ display: currentTab !== 0 ? 'none' : 'flex' }}>
          <DocumentSection
            newFile={props.newFile}
            openFile={props.open}
            canRedo={props.canRedo}
            canUndo={props.canUndo}
            exportGuitarPro={props.exportGuitarPro}
            exportMidi={props.exportMidi}
            print={props.print}
            redo={props.actionDispatcher.redo}
            undo={props.actionDispatcher.undo}
            openTempoDialog={openTempoDialog}
            openScoreInfo={openScoreInfoDialog}
          />
        </TabContainer>
        <TabContainer style={{ display: currentTab !== 1 ? 'none' : 'flex' }}>
          <EffectsSection
            editorScoreState={props.editorScoreState}
            actionDispatcher={props.actionDispatcher}
          />
        </TabContainer>
        <TabContainer style={{ display: currentTab !== 2 ? 'none' : 'flex' }}>
          <BeatSection
            actionDispatcher={props.actionDispatcher}
            editorScoreState={props.editorScoreState}
            setText={openTextDialog}
            setChord={openChordDialog}
            useChord={props.actionDispatcher.setChord}
            chords={props.currentAvailableChords}
          />
        </TabContainer>
        <TabContainer style={{ display: currentTab !== 3 ? 'none' : 'flex' }}>
          <DurationSetion
            editorScoreState={props.editorScoreState}
            actionDispatcher={props.actionDispatcher}
          />
        </TabContainer>
        <TabContainer style={{ display: currentTab !== 4 ? 'none' : 'flex' }}>
          <DynamicsSection
            editorScoreState={props.editorScoreState}
            actionDispatcher={props.actionDispatcher}
          />
        </TabContainer>
      </div>
    </div>
  );
}

export { EditorControls };

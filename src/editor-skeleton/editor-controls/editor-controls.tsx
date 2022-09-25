import React, { useState } from 'react';
import {
  Tabs, Tab, useTheme, styled,
} from '@mui/material';
import useDialog from '@hooks/use-dialog';
import DialogText from '@dialogs/dialog-text/dialog-text';
import DialogScoreInfo from '@dialogs/dialog-score-info/dialog-score-info';
import DialogTempo from '@dialogs/dialog-tempo/dialog-tempo';
import { ScoreInfo } from '../../editor-actions/actions/set-score-info/score-info';
import { BendType } from '../../alphatab-types/bend-type';
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
import EditorSettings from './editor-settings';
import { useTranslation } from 'react-i18next';

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

  const TabContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[100],
    borderTopColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : '#ede9e9',
    height: '45px',
    alignItems: 'center',
    overflowX: 'auto',
    overflowY: 'hidden',
    gap: '10px',
    paddingLeft: '10px',
    paddingRight: '10px',
    boxShadow: `0 4px 2px -2px ${theme.palette.mode === 'dark' ? '#312f2f' : '#e6e6e6'}`,
  }));

  const numberOfStrings = props.score?.tracks[props.selectedTrackIndex]?.staves[0]?.stringTuning.tunings.length ?? 6;

  const theme = useTheme();

  const backgroundColor = theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[100];
  const borderColor = theme.palette.mode === 'dark' ? theme.palette.grey[900] : '#ede9e9';

  const { t } = useTranslation();

  return (
    <div>
      <DialogText
        isOpen={isTextDialogOpen}
        currentText={props.editorScoreState.selectionText}
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
      <DialogChord
        isOpen={isChordDialogOpen}
        chord={props.editorScoreState.selectionChord}
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
          <Tab label={t('Document')} />
          <Tab label={t('Effects')} />
          <Tab label={t('Beat')} />
          <Tab label={t('Duration')} />
          <Tab label={t('Dynamics')} />
        </Tabs>
        <div style={{ backgroundColor, display: 'flex', gap: '10px' }}>
          <EditorSettings />
        </div>
      </div>
      <div>
        <TabContainer>
          {currentTab === 0
            && (
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
            )}
          {currentTab === 1
            && (
              <EffectsSection
                editorScoreState={props.editorScoreState}
                actionDispatcher={props.actionDispatcher}
              />
            )}
          {currentTab === 2
            && (
              <BeatSection
                actionDispatcher={props.actionDispatcher}
                editorScoreState={props.editorScoreState}
                setText={openTextDialog}
                setChord={openChordDialog}
                useChord={props.actionDispatcher.setChord}
                chords={props.currentAvailableChords}
              />
            )}
          {currentTab === 3
            && (
              <DurationSetion
                editorScoreState={props.editorScoreState}
                actionDispatcher={props.actionDispatcher}
              />
            )}
          {currentTab === 4
            && (
              <DynamicsSection
                editorScoreState={props.editorScoreState}
                actionDispatcher={props.actionDispatcher}
              />
            )}
        </TabContainer>
      </div>
    </div>
  );
}

export { EditorControls };

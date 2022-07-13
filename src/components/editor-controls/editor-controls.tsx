import React, { useState } from 'react';
import {
  Tabs, Tab, useTheme, styled,
} from '@mui/material';
import DialogSetText from './dialog-set-text/dialog-set-text';
import ScoreInfoComponent from './score-info/score-info';
import { ScoreInfo } from '../../editor/editor-actions/actions/set-score-info/score-info';
import { BendType } from '../../editor/bend-type';
import DarkModeGlyph from './icons/settings/dark-mode';
import { ColorModeContext } from '../../editor/color-mode-context';
import DynamicsSection from './sections/dynamics';
import DurationSetion from './sections/duration';
import BeatSection from './sections/beat';
import EffectsSection from './sections/effects';
import DocumentSection from './sections/document';

import {
  Chord,
  Duration, DynamicValue, HarmonicType, PickStroke, Score,
} from '../../alphatab-types/alphatab-types';
import useDialog from './use-dialog';
import DialogSetTempo from './dialog-set-tempo/dialog-set-tempo';
import DialogChord from './dialog-chord/dialog-chord';

export interface BendState {
  preBend: BendType;
  bend: BendType;
  release: BendType
}

interface EditorControlsProps {
  // Undo/Redo
  canUndo: boolean,
  canRedo: boolean,
  undo: () => void,
  redo: () => void,
  // Setters
  setDuration: (duration: Duration) => void,
  setDynamics: (dynamics: DynamicValue) => void,
  setText: (newText: string) => void,
  setScoreInfo: (scoreInfo: ScoreInfo) => void,
  setChord: (chord: Chord) => void,
  // Cursor state
  hasSelectedNote: boolean,
  hasSelectedBeat: boolean,
  // Selection state
  currentDuration: Duration | null,
  currentDynamics: DynamicValue | null,
  currentText: string | null,
  isPalmMute: boolean | null,
  isGhost: boolean | null,
  isDeadNote: boolean | null,
  isLeftHandTapNote: boolean | null,
  isVibrato: boolean | null,
  isHammerOrPull: boolean | null,
  isSlide: boolean | null,
  currentAccentuation: number | null,
  currentPickStroke: PickStroke | null,
  currentHarmonicType: HarmonicType | null,
  currentBend: BendState | null,
  currentChord: Chord | null,
  currentAvailableChords: Chord[],
  score: Score | null,
  // Set note modifiers
  togglePalmMute: () => void,
  setGhostNote: (value: boolean) => void,
  setAccentuationNote: (value: number) => void,
  setDeadNote: (value: boolean) => void,
  setPickStroke: (value: number) => void,
  setHarmonicType: (value: number) => void,
  setBend: (bend: BendState) => void,
  setHammer: (value: boolean) => void,
  setSlide: (value: boolean) => void,
  setTap: (value: boolean) => void,
  setVibrato: (value: boolean) => void,
  setTempo: (value: number) => void,
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
    props.setText(newText);
    closeTextDialog();
  };

  const saveNewScoreInfo = (scoreInfo: ScoreInfo) => {
    closeScoreInfoDialog();
    props.setScoreInfo(scoreInfo);
  };

  const saveChord = (chord: Chord) => {
    closeChordDialog();
    props.setChord(chord);
  };

  const saveTempo = (tempo: number) => {
    closeTempoDialog();
    props.setTempo(tempo);
  };

  const colorMode = React.useContext(ColorModeContext);
  const theme = useTheme();

  const backgroundColor = theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[100];
  const borderColor = theme.palette.mode === 'dark' ? theme.palette.grey[900] : '#ede9e9';

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

  return (
    <div>
      <DialogSetText
        isOpen={isTextDialogOpen}
        currentText={props.currentText}
        onClose={closeTextDialog}
        onSave={saveNewText}
      />
      {props.score && (
        <DialogSetTempo
          currentTempo={props.score?.tempo ?? 0}
          isOpen={isTempoDialogOpen}
          onClose={closeTempoDialog}
          onSet={saveTempo}
        />
      )}
      {props.score && (
        <ScoreInfoComponent
          isOpen={isScoreInfoDialogOpen}
          score={props.score}
          onClose={closeScoreInfoDialog}
          onSave={saveNewScoreInfo}
        />
      )}
      <DialogChord
        isOpen={isChordDialogOpen}
        chord={props.currentChord}
        onClose={closeChordDialog}
        onSave={saveChord}
      />
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
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
        <div style={{ backgroundColor }}>
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
            redo={props.redo}
            undo={props.undo}
            openTempoDialog={() => openTempoDialog()}
            openScoreInfo={() => openScoreInfoDialog()}
          />
        </TabContainer>
        <TabContainer style={{ display: currentTab !== 1 ? 'none' : 'flex' }}>
          <EffectsSection
            currentAccentuation={props.currentAccentuation}
            currentBend={props.currentBend}
            currentHarmonicType={props.currentHarmonicType}
            hasSelectedNote={props.hasSelectedNote}
            isDeadNote={props.isDeadNote}
            isGhost={props.isGhost}
            isPalmMute={props.isPalmMute}
            isLeftHandTapNote={props.isLeftHandTapNote}
            isVibrato={props.isVibrato}
            isHammerOrPull={props.isHammerOrPull}
            isSlide={props.isSlide}
            setVibrato={props.setVibrato}
            setAccentuationNote={props.setAccentuationNote}
            setBend={props.setBend}
            setHammer={props.setHammer}
            setSlide={props.setSlide}
            setDeadNote={props.setDeadNote}
            setHarmonicType={props.setHarmonicType}
            setGhostNote={props.setGhostNote}
            setTapNote={props.setTap}
            togglePalmMute={props.togglePalmMute}
          />
        </TabContainer>
        <TabContainer style={{ display: currentTab !== 2 ? 'none' : 'flex' }}>
          <BeatSection
            currentPickStroke={props.currentPickStroke}
            hasSelectedBeat={props.hasSelectedBeat}
            setPickStroke={props.setPickStroke}
            setText={() => openTextDialog()}
            setChord={() => openChordDialog()}
            useChord={props.setChord}
            chords={props.currentAvailableChords}
          />
        </TabContainer>
        <TabContainer style={{ display: currentTab !== 3 ? 'none' : 'flex' }}>
          <DurationSetion
            currentDuration={props.currentDuration}
            hasSelectedNote={props.hasSelectedNote}
            setDuration={(duration) => props.setDuration(duration)}
          />
        </TabContainer>
        <TabContainer style={{ display: currentTab !== 4 ? 'none' : 'flex' }}>
          <DynamicsSection
            currentDynamics={props.currentDynamics}
            hasSelectedNote={props.hasSelectedNote}
            setDynamics={(dynamic) => props.setDynamics(dynamic)}
          />
        </TabContainer>
      </div>
    </div>
  );
}

export { EditorControls };

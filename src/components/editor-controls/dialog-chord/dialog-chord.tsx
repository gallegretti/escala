/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  useTheme,
} from '@mui/material';
import { Chord } from '../../../alphatab-types/alphatab-types';
import ChordGrid from './chord-grid';
import ChordNut from './chord-nut';

interface DialogChordProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (chord: Chord) => void;
  chord: Chord | null;
}

const FirstFretInput = styled('input')({
  width: '10px',
  height: '15px',
  marginTop: '20px',
  // Hides the '+1' and '-1' input arrows
  '&::-moz-appearance': 'textfield',
  '&::-webkit-inner-spin-button': {
    '-webkit-appearance': 'none',
    margin: 0,
  },
  '&::-webkit-outer-spin-button': {
    '-webkit-appearance': 'none',
    margin: 0,
  },
});

const fretNotPlayed = -1;

export default function DialogChord(props: DialogChordProps) {
  const numberOfStrings = 6;
  const numberOfFrets = 6;
  const stringsInitialState = Array(numberOfStrings).fill(fretNotPlayed);

  const [firstFret, setFirstFret] = useState<number>(1);
  const [chordName, setChordName] = useState<string>(props.chord?.name ?? '');
  const [strings, setStrings] = useState<number[]>(stringsInitialState);
  const theme = useTheme();
  const updateChordName = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setChordName(event.target.value);
  };

  useEffect(() => {
    setChordName(props.chord?.name ?? '');
    setFirstFret(props.chord?.firstFret ?? 1);
    setStrings(props.chord?.strings.reverse() ?? stringsInitialState);
  }, [props.chord]);

  const noteClick = (fret: number, string: number) => {
    const newStrings = [...strings];
    if (newStrings[string] === fret) {
      newStrings[string] = fretNotPlayed;
    } else {
      newStrings[string] = fret;
    }
    setStrings(newStrings);
  };

  const firstFretChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstFret(Number.parseInt(e.target.value, 10));
  };

  const save = () => {
    const chord = new alphaTab.model.Chord();
    chord.name = chordName;
    chord.showDiagram = true;
    chord.showFingering = true;
    chord.showName = true;
    chord.firstFret = firstFret;
    chord.strings = strings.map((fret) => {
      if (fret === 0 || fret === fretNotPlayed) {
        return fret;
      }
      return fret + firstFret - 1;
    }).reverse();
    props.onSave(chord);
  };

  return (
    <Dialog
      open={props.isOpen}
      onClose={props.onClose}
    >
      <DialogContent>
        <TextField
          id="chord-name"
          label="Chord Name"
          autoFocus
          type="text"
          value={props.chord?.name ?? chordName}
          onChange={(event) => updateChordName(event)}
        />
        <div aria-label="Chord grid" style={{ position: 'relative', marginTop: '30px' }}>
          <ChordNut
            noteClick={noteClick}
            numberOfStrings={numberOfStrings}
            strings={strings}
          />

          <div style={{ display: 'flex' }}>
            <FirstFretInput
              type="number"
              onChange={firstFretChange}
              value={firstFret}
            />
            <div style={{
              position: 'relative',
              width: '90%',
              height: '300px',
              margin: 'auto',
            }}
            >
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  backgroundColor: theme.palette.text.primary,
                  left: '-12px',
                  width: 'calc(100% + 24px)',
                  height: '8px',
                  zIndex: '99',
                }}
              />
              <ChordGrid
                noteClick={noteClick}
                numberOfFrets={numberOfFrets}
                numberOfStrings={numberOfStrings}
                strings={strings}
              />
            </div>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button id="chord-save" onClick={save} title="Save">Save</Button>
      </DialogActions>
    </Dialog>
  );
}

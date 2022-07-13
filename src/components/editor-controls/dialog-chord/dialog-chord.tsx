/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog, DialogActions, DialogContent, TextField,
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

export default function DialogChord(props: DialogChordProps) {
  const numberOfStrings = 6;
  const numberOfFrets = 6;
  const stringsInitialState = Array(numberOfStrings).fill(-1);

  const [chordName, setChordName] = useState(props.chord?.name ?? '');
  const [strings, setStrings] = useState(stringsInitialState);
  const updateChordName = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setChordName(event.target.value);
  };

  useEffect(() => {
    setChordName(props.chord?.name ?? '');
    setStrings(props.chord?.strings.reverse() ?? stringsInitialState);
  }, [props.chord]);

  const noteClick = (fret: number, string: number) => {
    const newStrings = [...strings];
    if (newStrings[string] === fret) {
      newStrings[string] = -1;
    } else {
      newStrings[string] = fret;
    }
    setStrings(newStrings);
  };

  const save = () => {
    const chord = new alphaTab.model.Chord();
    chord.name = chordName;
    chord.showDiagram = true;
    chord.showFingering = true;
    chord.showName = true;
    chord.strings = [...strings].reverse();
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
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              backgroundColor: 'white',
              width: '100%',
              height: '8px',
              zIndex: '99',
            }}
          />
          <div style={{
            position: 'relative',
            width: '90%',
            height: '300px',
            margin: 'auto',
          }}
          >
            <ChordGrid
              noteClick={noteClick}
              numberOfFrets={numberOfFrets}
              numberOfStrings={numberOfStrings}
              strings={strings}
            />
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button id="chord-save" onClick={save} title="Save">Save</Button>
      </DialogActions>
    </Dialog>
  );
}

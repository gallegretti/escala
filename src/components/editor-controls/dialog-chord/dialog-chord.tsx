import React, { useState } from 'react';
import {
  Button,
  Dialog, DialogActions, DialogContent, TextField,
} from '@mui/material';
import { Chord } from '../../../alphatab-types/alphatab-types';
import ChordGrid from './chord-grid';

interface DialogChordProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (chord: Chord) => void;
  chord?: Chord;
}

export default function DialogChord(props: DialogChordProps) {
  const [chordName, setChordName] = useState('');
  const [strings, setStrings] = useState([-1, -1, -1, -1, -1, -1]);
  const updateChordName = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setChordName(event.target.value);
  };

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
    chord.strings = strings;
    props.onSave(chord);
  };

  const numberOfStrings = 6;
  const numberOfFrets = 6;
  return (
    <Dialog
      open={props.isOpen}
      onClose={props.onClose}
    >
      <DialogContent>
        <TextField
          InputProps={{
            style: {
              textAlign: 'center',
            },
          }}
          label="Chord Name"
          autoFocus
          type="text"
          value={props.chord?.name ?? chordName}
          onChange={(event) => updateChordName(event)}
        />
        <div style={{ position: 'relative', marginTop: '30px' }}>
          <div style={{
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
        <Button onClick={save} title="Save">Save</Button>
      </DialogActions>
    </Dialog>
  );
}

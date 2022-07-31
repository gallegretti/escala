import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
} from '@mui/material';
import { Chord } from '../../../alphatab-types/alphatab-types';
import ChordInput from './chord-input';

interface DialogChordProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (chord: Chord) => void;
  chord: Chord | null;
}

const fretNotPlayed = -1;

export default function DialogChord(props: DialogChordProps) {
  const numberOfStrings = 6;
  const numberOfFrets = 6;
  const stringsInitialState = Array(numberOfStrings).fill(fretNotPlayed);

  const [firstFret, setFirstFret] = useState<number>(1);
  const [chordName, setChordName] = useState<string>(props.chord?.name ?? '');
  const [strings, setStrings] = useState<number[]>(stringsInitialState);
  const updateChordName = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setChordName(event.target.value);
  };

  useEffect(() => {
    setChordName(props.chord?.name ?? '');
    setFirstFret(props.chord?.firstFret ?? 1);
    setStrings(props.chord?.strings.reverse() ?? stringsInitialState);
  }, [props.chord]);

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
          value={chordName}
          onChange={updateChordName}
        />
        <div aria-label="Chord grid" style={{ position: 'relative', marginTop: '30px' }}>
          <ChordInput
            firstFret={firstFret}
            setFirstFret={setFirstFret}
            numberOfFrets={numberOfFrets}
            numberOfStrings={numberOfStrings}
            setStrings={setStrings}
            strings={strings}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          disabled={chordName.length === 0}
          id="chord-save"
          onClick={save}
          title="Save"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

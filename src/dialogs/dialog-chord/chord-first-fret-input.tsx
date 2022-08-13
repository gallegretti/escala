import styled from '@emotion/styled';
import React, { useMemo } from 'react';

export default function ChordFirstFretInput(props: { firstFret: number, setFirstFret: (arg: number) => void }) {
  const FirstFretInput = useMemo(() => styled('input')({
    width: `${props.firstFret.toString().length}ch`, // Resize input based on number of characters
    height: '15px',
    position: 'absolute',
    top: '20px',
    left: `calc(-16px - ${props.firstFret.toString().length}ch)`, // Right align
    textAlign: 'center',
    // Hides the '+1' and '-1' input arrows
    MozAppearance: 'textfield',
    '&::-webkit-inner-spin-button': {
      WebkitAppearance: 'none',
      margin: 0,
    },
    '&::-webkit-outer-spin-button': {
      WebkitAppearance: 'none',
      margin: 0,
    },
  }), [props.firstFret]);

  const firstFretChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFret = Number.parseInt(e.target.value, 10);
    if (Number.isNaN(newFret) || newFret < 0) {
      props.setFirstFret(0)
    } else {
      props.setFirstFret(Number.parseInt(e.target.value, 10));
    }
  };

  return (
    <FirstFretInput
      type="number"
      title="First fret"
      onChange={firstFretChange}
      value={props.firstFret}
    />
  );
}

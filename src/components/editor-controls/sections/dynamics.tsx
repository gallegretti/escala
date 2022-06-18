import React from 'react';
import { PianoPianissimoGlyph } from '../icons/dynamics/ppp';
import { PianissimoGlyph } from '../icons/dynamics/pp';
import { PianoGlyph } from '../icons/dynamics/p';
import { MezzoPianoGlyph } from '../icons/dynamics/mp';
import { ForteGlyph } from '../icons/dynamics/f';
import { FortissimoGlyph } from '../icons/dynamics/ff';
import { MezzoForteGlyph } from '../icons/dynamics/mf';
import { ForteFortissimoGlyph } from '../icons/dynamics/fff';
import { DynamicValue } from '../../../alphatab-types/alphatab-types';

interface DynamicsSectionProps {
    hasSelectedNote: boolean;
    currentDynamics: DynamicValue | null;
    setDynamics: (v: DynamicValue) => void;
}

export default function DynamicsSection(props: DynamicsSectionProps) {
  return (
    <>
      <PianoPianissimoGlyph
        disabled={!props.hasSelectedNote}
        selected={props.currentDynamics === alphaTab.model.DynamicValue.PPP}
        onClick={() => props.setDynamics(alphaTab.model.DynamicValue.PPP)}
      />
      <PianissimoGlyph
        disabled={!props.hasSelectedNote}
        selected={props.currentDynamics === alphaTab.model.DynamicValue.PP}
        onClick={() => props.setDynamics(alphaTab.model.DynamicValue.PP)}
      />
      <PianoGlyph
        disabled={!props.hasSelectedNote}
        selected={props.currentDynamics === alphaTab.model.DynamicValue.P}
        onClick={() => props.setDynamics(alphaTab.model.DynamicValue.P)}
      />
      <MezzoPianoGlyph
        disabled={!props.hasSelectedNote}
        selected={props.currentDynamics === alphaTab.model.DynamicValue.MP}
        onClick={() => props.setDynamics(alphaTab.model.DynamicValue.MP)}
      />
      <MezzoForteGlyph
        disabled={!props.hasSelectedNote}
        selected={props.currentDynamics === alphaTab.model.DynamicValue.MF}
        onClick={() => props.setDynamics(alphaTab.model.DynamicValue.MF)}
      />
      <ForteGlyph
        disabled={!props.hasSelectedNote}
        selected={props.currentDynamics === alphaTab.model.DynamicValue.F}
        onClick={() => props.setDynamics(alphaTab.model.DynamicValue.F)}
      />
      <FortissimoGlyph
        disabled={!props.hasSelectedNote}
        selected={props.currentDynamics === alphaTab.model.DynamicValue.FF}
        onClick={() => props.setDynamics(alphaTab.model.DynamicValue.FF)}
      />
      <ForteFortissimoGlyph
        disabled={!props.hasSelectedNote}
        selected={props.currentDynamics === alphaTab.model.DynamicValue.FFF}
        onClick={() => props.setDynamics(alphaTab.model.DynamicValue.FFF)}
      />
    </>
  );
}

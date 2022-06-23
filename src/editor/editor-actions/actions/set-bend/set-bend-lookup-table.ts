/* eslint-disable max-len */
import { BendState } from '../../../../components/editor-controls/editor-controls';
import { BendType } from '../../../bend-type';
import { BendPoint, Note } from '../../../../alphatab-types/alphatab-types';

const mapping: Record<string, () => BendPoint[]> = {
  // All off
  'null,null,null': () => [],
  // One half
  'half,null,null': () => [new alphaTab.model.BendPoint(0, 2), new alphaTab.model.BendPoint(60, 2)],
  'null,half,null': () => [new alphaTab.model.BendPoint(0, 0), new alphaTab.model.BendPoint(30, 2), new alphaTab.model.BendPoint(60, 2)],
  'null,null,half': () => [new alphaTab.model.BendPoint(0, 2), new alphaTab.model.BendPoint(60, 2)],
  // One full
  'full,null,null': () => [new alphaTab.model.BendPoint(0, 4), new alphaTab.model.BendPoint(60, 4)],
  'null,full,null': () => [new alphaTab.model.BendPoint(0, 0), new alphaTab.model.BendPoint(30, 4), new alphaTab.model.BendPoint(60, 4)],
  'null,null,full': () => [new alphaTab.model.BendPoint(0, 0), new alphaTab.model.BendPoint(60, 0)],
  // Two half
  'half,half,null': () => [new alphaTab.model.BendPoint(0, 2), new alphaTab.model.BendPoint(60, 2)],
  'null,half,half': () => [new alphaTab.model.BendPoint(0, 0), new alphaTab.model.BendPoint(30, 2), new alphaTab.model.BendPoint(60, 2)],
  'half,null,half': () => [new alphaTab.model.BendPoint(0, 2), new alphaTab.model.BendPoint(60, 2)],
  // Two full
  'full,full,null': () => [new alphaTab.model.BendPoint(0, 4), new alphaTab.model.BendPoint(60, 4)],
  'null,full,full': () => [new alphaTab.model.BendPoint(0, 0), new alphaTab.model.BendPoint(20, 4), new alphaTab.model.BendPoint(40, 4), new alphaTab.model.BendPoint(60, 0)], // OK
  'full,null,full': () => [new alphaTab.model.BendPoint(0, 4), new alphaTab.model.BendPoint(20, 4), new alphaTab.model.BendPoint(40, 0), new alphaTab.model.BendPoint(60, 0)], // OK
  // One half, one full
  'half,full,null': () => [new alphaTab.model.BendPoint(0, 2), new alphaTab.model.BendPoint(30, 2), new alphaTab.model.BendPoint(60, 4)],
  'null,half,full': () => [new alphaTab.model.BendPoint(0, 0), new alphaTab.model.BendPoint(30, 2), new alphaTab.model.BendPoint(60, 0)],
  'full,null,half': () => [new alphaTab.model.BendPoint(0, 4), new alphaTab.model.BendPoint(20, 4), new alphaTab.model.BendPoint(40, 2), new alphaTab.model.BendPoint(60, 2)],
  'half,null,full': () => [new alphaTab.model.BendPoint(0, 2), new alphaTab.model.BendPoint(20, 2), new alphaTab.model.BendPoint(40, 0), new alphaTab.model.BendPoint(60, 0)],
  'full,half,null': () => [new alphaTab.model.BendPoint(0, 4), new alphaTab.model.BendPoint(20, 4), new alphaTab.model.BendPoint(40, 2), new alphaTab.model.BendPoint(60, 2)],
  'null,full,half': () => [new alphaTab.model.BendPoint(0, 0), new alphaTab.model.BendPoint(15, 4), new alphaTab.model.BendPoint(30, 4), new alphaTab.model.BendPoint(45, 2), new alphaTab.model.BendPoint(60, 2)], // OK
  // Two half, one full
  'half,half,full': () => [new alphaTab.model.BendPoint(0, 2), new alphaTab.model.BendPoint(20, 2), new alphaTab.model.BendPoint(40, 2), new alphaTab.model.BendPoint(60, 0)],
  'half,full,half': () => [new alphaTab.model.BendPoint(0, 2), new alphaTab.model.BendPoint(15, 2), new alphaTab.model.BendPoint(30, 4), new alphaTab.model.BendPoint(45, 4), new alphaTab.model.BendPoint(60, 2)],
  'full,half,half': () => [new alphaTab.model.BendPoint(0, 4), new alphaTab.model.BendPoint(15, 4), new alphaTab.model.BendPoint(30, 2), new alphaTab.model.BendPoint(45, 2), new alphaTab.model.BendPoint(60, 2)],
  // Two full, one half
  'full,full,half': () => [new alphaTab.model.BendPoint(0, 4), new alphaTab.model.BendPoint(15, 4), new alphaTab.model.BendPoint(30, 4), new alphaTab.model.BendPoint(45, 2), new alphaTab.model.BendPoint(60, 2)],
  'full,half,full': () => [new alphaTab.model.BendPoint(0, 4), new alphaTab.model.BendPoint(15, 4), new alphaTab.model.BendPoint(30, 4), new alphaTab.model.BendPoint(45, 2), new alphaTab.model.BendPoint(60, 2)],
  'half,full,full': () => [new alphaTab.model.BendPoint(0, 4), new alphaTab.model.BendPoint(10, 4), new alphaTab.model.BendPoint(20, 2), new alphaTab.model.BendPoint(30, 2), new alphaTab.model.BendPoint(40, 0), new alphaTab.model.BendPoint(50, 0), new alphaTab.model.BendPoint(60, 0)],
  // Three full
  'full,full,full': () => [new alphaTab.model.BendPoint(0, 4), new alphaTab.model.BendPoint(20, 4), new alphaTab.model.BendPoint(40, 0), new alphaTab.model.BendPoint(60, 0)],
  // Three half
  'half,half,half': () => [new alphaTab.model.BendPoint(0, 2), new alphaTab.model.BendPoint(60, 2)],
};

export function getBendPoints(state: BendState): BendPoint[] {
  const key = `${state.preBend},${state.bend},${state.release}`;
  return mapping[key]();
}

export function getBendState(note: Note): BendState {
  // By default we try to use the stored bend state (if it was set on the UI)
  if (note.bendState) {
    return note.bendState;
  }
  // Else, fall back to detecting the current bend state from the bend points
  const entry = Object.entries(mapping).find(([key, optionBendpoints]) => JSON.stringify(optionBendpoints()) === JSON.stringify(note.bendPoints));
  if (!entry) {
    return {
      bend: null,
      preBend: null,
      release: null,
    };
  }
  const bendTypes = entry[0].split(',').map((v) => (v === 'null' ? null : v)) as BendType[];
  return {
    preBend: bendTypes[0],
    bend: bendTypes[1],
    release: bendTypes[2],
  };
}

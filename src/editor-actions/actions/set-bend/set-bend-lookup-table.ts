import { BendState } from '../../../editor-skeleton/editor-controls/editor-controls';
import { BendType } from '../../../alphatab-types/bend-type';
import { BendPoint, Note } from '../../../alphatab-types/alphatab-types';

function bendValue(bendType: BendType): number {
  if (bendType === 'quarter') {
    return 1;
  }
  if (bendType === 'half') {
    return 2;
  }
  if (bendType === 'full') {
    return 4;
  }
  return 0;
}

function bendPoints(...numbers: number[]): BendPoint[] {
  const points: BendPoint[] = [];
  const step = 60 / (numbers.length - 1);
  numbers.forEach((number, i) => {
    points.push(new alphaTab.model.BendPoint(i * step, number));
  });
  return points;
}

export function getBendPoints(state: BendState): BendPoint[] {
  // Zero selected
  if (state.preBend === null && state.bend === null && state.release === null) {
    return [];
  }

  // One selected
  if (state.preBend !== null && state.bend === null && state.release === null) {
    return bendPoints(bendValue(state.preBend), bendValue(state.preBend));
  }
  if (state.preBend === null && state.bend !== null && state.release === null) {
    return bendPoints(0, bendValue(state.bend), bendValue(state.bend));
  }
  if (state.preBend === null && state.bend === null && state.release !== null) {
    return [];
  }

  // Two selected
  if (state.preBend === null && state.bend !== null && state.release !== null) {
    const release = Math.max(bendValue(state.bend) - bendValue(state.release), 0);
    return bendPoints(0, bendValue(state.bend), bendValue(state.bend), release, release);
  }
  if (state.preBend !== null && state.bend !== null && state.release === null) {
    if (state.preBend === state.bend) {
      return bendPoints(bendValue(state.preBend), bendValue(state.bend));
    }
    return bendPoints(bendValue(state.preBend), bendValue(state.preBend), bendValue(state.bend), bendValue(state.bend));
  }
  if (state.preBend !== null && state.bend === null && state.release !== null) {
    const release = Math.max(bendValue(state.preBend) - bendValue(state.release), 0);
    return bendPoints(bendValue(state.preBend), bendValue(state.preBend), release, release);
  }

  // Three selected
  if (state.preBend !== null && state.bend !== null && state.release !== null) {
    const release = Math.max(bendValue(state.bend) - bendValue(state.release), 0);
    return bendPoints(bendValue(state.preBend), bendValue(state.preBend), bendValue(state.bend), bendValue(state.bend), release);
  }

  return [];
}

function makeLookupTable() {
  const lookupTable: Record<string, () => BendPoint[]> = {};
  const bendType: BendType[] = [null, 'quarter', 'half', 'full'];
  /* eslint-disable no-restricted-syntax */
  for (const preBend of bendType) {
    for (const bend of bendType) {
      for (const release of bendType) {
        lookupTable[`${preBend},${bend},${release}`] = () => getBendPoints({
          preBend,
          bend,
          release,
        });
      }
    }
  }
  /* eslint-enable no-restricted-syntax */
  return lookupTable;
}

const lookupTable = makeLookupTable();

export function getBendState(note: Note): BendState {
  // By default we try to use the stored bend state (if it was set on the UI)
  if (note.bendState) {
    return note.bendState;
  }
  // Else, fall back to detecting the current bend state from the bend points
  const entry = Object.entries(lookupTable)
    .find(([key, optionBendpoints]) => JSON.stringify(optionBendpoints()) === JSON.stringify(note.bendPoints));
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

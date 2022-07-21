import { Tuning } from '../../../../alphatab-types/alphatab-types';

/* eslint-disable no-underscore-dangle */
const tunings = alphaTab.model.Tuning._sixStrings as unknown as Tuning[];
const defaultTuning = alphaTab.model.Tuning._defaultTunings.get(6) as unknown as Tuning;

export { tunings, defaultTuning };

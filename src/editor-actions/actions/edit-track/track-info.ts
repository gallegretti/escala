import { Tuning } from '../../../alphatab-types/alphatab-types';

export default interface TrackInfo {
  name: string;
  capo: number;
  tuning: Tuning;
}

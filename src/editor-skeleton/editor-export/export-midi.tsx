import { AlphaTabApi } from '../../alphatab-types/alphatab-types';

export default function exportMidi(api: AlphaTabApi | null) {
  if (!api) {
    return;
  }
  api?.downloadMidi();
}

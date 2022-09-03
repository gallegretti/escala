import { AlphaTabApi } from '../../alphatab-types/alphatab-types';

export default function exportGuitarPro(api: AlphaTabApi | null) {
  if (!api?.score) {
    return;
  }
  const exporter = new alphaTab.exporter.Gp7Exporter();
  const data = exporter.export(api.score, api.settings);
  const a = document.createElement('a');
  a.download = `${api?.score?.title || 'File'}.gp`;
  a.href = URL.createObjectURL(new Blob([data]));
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

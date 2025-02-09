import { Dialog } from "@mui/material";
import { Score, Track } from "../../alphatab-types/alphatab-types";
import styled from "@emotion/styled";
import { AudioMixerTrack } from "./audio-mixer-track";

interface AudioMixerProps {
  isOpen: boolean;
  onClose: () => void;
  onVolumeChange: (track: Track, volume: number) => void;
  score: Score;
}

const TrackLayout = styled('div')({
  display: 'flex',
  height: '360px'
});

export function DialogAudioMixer(props: AudioMixerProps) {
  return (
    <Dialog
      open={props.isOpen}
      onClose={props.onClose}
    >
      <TrackLayout>
        {props.score.tracks.map((track) => (
          <AudioMixerTrack key={track.index} track={track} onVolumeChange={props.onVolumeChange} />
        ))}
      </TrackLayout>
    </Dialog>
  );
}

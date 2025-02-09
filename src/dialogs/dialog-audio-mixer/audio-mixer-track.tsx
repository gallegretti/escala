import { Slider } from "@mui/material";
import { Track } from "../../alphatab-types/alphatab-types";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";

interface AudioMixerTrack {
  track: Track;
  onVolumeChange: (track: Track, volume: number) => void;
}

const AudioMixerLayout = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: '300px',
  width: '200px'
});

const AudioMixerTrackName = styled('p')({
  height: '120px',
  textAlign: 'center'
});

const VerticalVolumeSlider = styled(Slider)({
  '& .MuiSlider-thumb': {
    borderRadius: '2px',
    height: '10px'
  },
})

export function AudioMixerTrack(props: AudioMixerTrack) {
  const [volumeState, setVolumeState] = useState(props.track.playbackInfo.volume);

  useEffect(() => {
    props.track.playbackInfo.volume = volumeState;
    props.onVolumeChange(props.track, volumeState);
  }, [volumeState]);

  return (
    <AudioMixerLayout>
      <AudioMixerTrackName>{props.track.name}</AudioMixerTrackName>
      <VerticalVolumeSlider
        min={0}
        max={16}
        marks
        value={volumeState}
        onChange={(_, volume) => setVolumeState(volume as number)}
        orientation="vertical"
      />
    </AudioMixerLayout>
  );
}
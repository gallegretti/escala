import React, { useEffect } from 'react';
import { styled } from '@mui/material';
import { AlphaTabApi, PlayerStateChangedEventArgs, RenderFinishedEventArgs } from '../../alphatab-types/alphatab-types';

interface AlphaTabViewportProps {
  playerStateChanged?: (arg0: PlayerStateChangedEventArgs) => void;
  renderFinished?: (arg0: RenderFinishedEventArgs) => void;
  apiReady?: (api: AlphaTabApi) => void;
  children: JSX.Element;
}

const AlphaTabContainer = styled('div')`
  ${(props) => (props.theme.palette.mode === 'dark' ? `
  fill: white;
  background-color: black;
  & rect {
      fill: white;
  }
  & text {
      fill: white;
  }
  & path {
      fill: white;
      stroke: white;
  }
  ` : '')}
`;

export default function AlphaTabViewport(props: AlphaTabViewportProps) {
  useEffect(() => {
    const main = document.getElementById('alphaTab');
    const settings = {
      file: 'samples/simple-2.gp',
      player: {
        enablePlayer: true,
        enableCursor: true,
        enableUserInteraction: true,
        soundfont: './alphatab/soundfont/sonivox.sf2',
      },
      core: {
        includeNoteBounds: true,
        logLevel: 2,
      },
      display: {
        resources: {
          // staffLineColor: '#FFFFFF',
        },
      },
    };
    const newApi = new alphaTab.AlphaTabApi(main!, settings);
    if (props.apiReady) {
      props.apiReady(newApi);
    }
    // Setup observables
    if (props.playerStateChanged) {
      newApi.playerStateChanged.on(props.playerStateChanged);
    }
    if (props.renderFinished) {
      newApi.renderFinished.on(props.renderFinished);
    }
    return function cleanup() {
      // Remove observables
      if (props.playerStateChanged) {
        newApi.playerStateChanged.off(props.playerStateChanged);
      }
      if (props.renderFinished) {
        newApi.renderFinished.off(props.renderFinished);
      }
    };
  }, []);

  return (
    <AlphaTabContainer className="app-viewport">
      <div id="alphaTab" className="at-main">
        {props.children}
      </div>
    </AlphaTabContainer>
  );
}

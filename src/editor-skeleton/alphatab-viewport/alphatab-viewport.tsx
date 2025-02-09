import React, { useEffect } from 'react';
import { styled } from '@mui/material';
import {
  CoreSettings, LogLevel, PlayerSettings, Settings,
} from '@coderline/alphatab';
import { AlphaTabApi, PlayerStateChangedEventArgs, RenderFinishedEventArgs } from '../../alphatab-types/alphatab-types';

interface AlphaTabViewportProps {
  playerStateChanged?: (arg0: PlayerStateChangedEventArgs) => void;
  renderFinished?: (arg0: RenderFinishedEventArgs) => void;
  apiReady?: (api: AlphaTabApi) => void;
  children: JSX.Element;
}

const AlphaTabContainer = styled('div')`
  overflow-y: auto;
  position: absolute;
  top: 96px;
  left: 140px;
  right: 0;
  bottom: 0;
  padding-right: 20px;

  /* These elements are created by AlphaTab */
  .at-cursor-bar {
    /* Defines the color of the bar background when a bar is played */
    background: rgba(255, 242, 0, 0.25);
  }

  .at-selection div {
    /* Defines the color of the selection background */
    background: rgba(64, 64, 255, 0.2);
  }

  .at-cursor-beat {
    /* Defines the beat cursor */
    background: rgba(64, 64, 255, 0.75);
    width: 3px;
  }
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
    const settings: Partial<Settings> = {
      player: {
        enablePlayer: true,
        enableCursor: true,
        enableUserInteraction: true,
        soundFont: './alphatab/soundfont/sonivox.sf2',
        scrollElement: document.getElementById('alphatab-container'),
      } as PlayerSettings,
      core: {
        file: 'samples/simple-2.gp',
        includeNoteBounds: true,
        logLevel: LogLevel.Info,
      } as CoreSettings,
    };
    const alphaTabApi = new alphaTab.AlphaTabApi(main!, settings);
    // Setup observables
    if (props.playerStateChanged) {
      alphaTabApi.playerStateChanged.on(props.playerStateChanged);
    }
    if (props.renderFinished) {
      alphaTabApi.renderFinished.on(props.renderFinished);
    }
    if (props.apiReady) {
      props.apiReady(alphaTabApi);
    }
    return function cleanup() {
      // Remove observables
      if (props.playerStateChanged) {
        alphaTabApi.playerStateChanged.off(props.playerStateChanged);
      }
      if (props.renderFinished) {
        alphaTabApi.renderFinished.off(props.renderFinished);
      }
      alphaTabApi.destroy();
    };
  }, []);

  return (
    <AlphaTabContainer id="alphatab-container">
      <div id="alphaTab">
        {props.children}
      </div>
    </AlphaTabContainer>
  );
}

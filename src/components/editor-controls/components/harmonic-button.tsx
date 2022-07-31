import React from 'react';
import NaturalHarmonicGlyph from '../icons/effects/harmonic/natural-harmonic';
import ArtificialHarmonicGlyph from '../icons/effects/harmonic/artificial-harmonic';
import PinchHarmonicGlyph from '../icons/effects/harmonic/pinch-harmonic';
import TapHarmonicGlyph from '../icons/effects/harmonic/tap-harmonic';
import SemiHarmonicGlyph from '../icons/effects/harmonic/semi-harmonic';
import FeedbackHarmonicGlyph from '../icons/effects/harmonic/feedback-harmonic';
import GenericHarmonicGlyph from '../icons/effects/harmonic/generic-harmonic';
import { StyledPopper } from './styled-popper';
import useAnchorElem from '../../../hooks/use-anchor-element';

interface HarmonicButtonProps {
  disabled: boolean;
  currentHarmonicType: number;
  setHarmonicType: (harmonicType: number) => void;
  isPopperOpen: boolean;
  setPopperOpen: () => void;
}

function harmonicTypeToString(type: number) {
  switch (type) {
    case 0:
      return 'H.';
    case 1:
      return 'N.H';
    case 2:
      return 'A.H';
    case 3:
      return 'P.H';
    case 4:
      return 'T.H';
    case 5:
      return 'S.H';
    case 6:
      return 'F.H';
    default:
      return '';
  }
}

export default function HarmonicButton(props: HarmonicButtonProps) {
  const [anchorElem, setAnchorElement] = useAnchorElem();

  const onClick = (e: any) => {
    setAnchorElement(e);
    props.setPopperOpen();
  };

  const popperModifiers = [
    {
      name: 'offset',
      options: {
        offset: [0, 14],
      },
    },
  ];

  const setHarmonic = (harmonic: number) => {
    if (props.currentHarmonicType === harmonic) {
      props.setHarmonicType(alphaTab.model.HarmonicType.None);
    } else {
      props.setHarmonicType(harmonic);
    }
  };

  return (
    <div>
      <GenericHarmonicGlyph
        title="Harmonics"
        hideTooltip={props.isPopperOpen}
        selected={props.currentHarmonicType !== 0}
        disabled={props.disabled}
        onClick={onClick}
      >
        {harmonicTypeToString(props.currentHarmonicType)}
      </GenericHarmonicGlyph>
      {props.isPopperOpen && anchorElem
        && (
          <StyledPopper modifiers={popperModifiers} open={props.isPopperOpen} anchorEl={anchorElem} disablePortal>
            <NaturalHarmonicGlyph
              disabled={props.disabled}
              selected={props.currentHarmonicType === alphaTab.model.HarmonicType.Natural}
              onClick={() => setHarmonic(alphaTab.model.HarmonicType.Natural)}
            />
            <ArtificialHarmonicGlyph
              disabled={props.disabled}
              selected={props.currentHarmonicType === alphaTab.model.HarmonicType.Artificial}
              onClick={() => setHarmonic(alphaTab.model.HarmonicType.Artificial)}
            />
            <PinchHarmonicGlyph
              disabled={props.disabled}
              selected={props.currentHarmonicType === alphaTab.model.HarmonicType.Pinch}
              onClick={() => setHarmonic(alphaTab.model.HarmonicType.Pinch)}
            />
            <TapHarmonicGlyph
              disabled={props.disabled}
              selected={props.currentHarmonicType === alphaTab.model.HarmonicType.Tap}
              onClick={() => setHarmonic(alphaTab.model.HarmonicType.Tap)}
            />
            <SemiHarmonicGlyph
              disabled={props.disabled}
              selected={props.currentHarmonicType === alphaTab.model.HarmonicType.Semi}
              onClick={() => setHarmonic(alphaTab.model.HarmonicType.Semi)}
            />
            <FeedbackHarmonicGlyph
              disabled={props.disabled}
              selected={props.currentHarmonicType === alphaTab.model.HarmonicType.Feedback}
              onClick={() => setHarmonic(alphaTab.model.HarmonicType.Feedback)}
            />
          </StyledPopper>
        )}
    </div>
  );
}

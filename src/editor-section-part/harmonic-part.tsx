import React from 'react';
import NaturalHarmonicGlyph from '@glyphs/effects/harmonic/natural-harmonic';
import ArtificialHarmonicGlyph from '@glyphs/effects/harmonic/artificial-harmonic';
import PinchHarmonicGlyph from '@glyphs/effects/harmonic/pinch-harmonic';
import TapHarmonicGlyph from '@glyphs/effects/harmonic/tap-harmonic';
import SemiHarmonicGlyph from '@glyphs/effects/harmonic/semi-harmonic';
import FeedbackHarmonicGlyph from '@glyphs/effects/harmonic/feedback-harmonic';
import GenericHarmonicGlyph from '@glyphs/effects/harmonic/generic-harmonic';
import useAnchorElem from '@hooks/use-anchor-element';
import StyledPopper from './styled-popper';
import EditorScoreState from '../editor/editor-score-state';
import EditorActionDispatcher from '../editor/editor-action-dispatcher';

interface HarmonicPartProps {
  editorScoreState: EditorScoreState;
  actionDispatcher: EditorActionDispatcher;
  currentHarmonicType: number;
  openPopper: string | null;
  updateOpenPopper: (popper: string) => void;
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

export default function HarmonicPart(props: HarmonicPartProps) {
  const [anchorElem, setAnchorElement] = useAnchorElem();

  const onClick = (e: any) => {
    setAnchorElement(e);
    props.updateOpenPopper('harmonic');
  };

  const disabled = !props.editorScoreState.hasSelectedNote;

  const popperModifiers = [
    {
      name: 'offset',
      options: {
        offset: [0, 14],
      },
    },
  ];

  const isPopperOpen = props.openPopper === 'harmonic';

  const setHarmonic = (harmonic: number) => {
    if (props.currentHarmonicType === harmonic) {
      props.actionDispatcher.setHarmonicType(alphaTab.model.HarmonicType.None);
    } else {
      props.actionDispatcher.setHarmonicType(harmonic);
    }
  };

  return (
    <div>
      <GenericHarmonicGlyph
        title="Harmonics"
        hideTooltip={isPopperOpen}
        selected={props.currentHarmonicType !== 0}
        disabled={disabled}
        onClick={onClick}
      >
        {harmonicTypeToString(props.currentHarmonicType)}
      </GenericHarmonicGlyph>
      {isPopperOpen && anchorElem
        && (
          <StyledPopper modifiers={popperModifiers} open={isPopperOpen} anchorEl={anchorElem} disablePortal>
            <NaturalHarmonicGlyph
              disabled={disabled}
              selected={props.currentHarmonicType === alphaTab.model.HarmonicType.Natural}
              onClick={() => setHarmonic(alphaTab.model.HarmonicType.Natural)}
            />
            <ArtificialHarmonicGlyph
              disabled={disabled}
              selected={props.currentHarmonicType === alphaTab.model.HarmonicType.Artificial}
              onClick={() => setHarmonic(alphaTab.model.HarmonicType.Artificial)}
            />
            <PinchHarmonicGlyph
              disabled={disabled}
              selected={props.currentHarmonicType === alphaTab.model.HarmonicType.Pinch}
              onClick={() => setHarmonic(alphaTab.model.HarmonicType.Pinch)}
            />
            <TapHarmonicGlyph
              disabled={disabled}
              selected={props.currentHarmonicType === alphaTab.model.HarmonicType.Tap}
              onClick={() => setHarmonic(alphaTab.model.HarmonicType.Tap)}
            />
            <SemiHarmonicGlyph
              disabled={disabled}
              selected={props.currentHarmonicType === alphaTab.model.HarmonicType.Semi}
              onClick={() => setHarmonic(alphaTab.model.HarmonicType.Semi)}
            />
            <FeedbackHarmonicGlyph
              disabled={disabled}
              selected={props.currentHarmonicType === alphaTab.model.HarmonicType.Feedback}
              onClick={() => setHarmonic(alphaTab.model.HarmonicType.Feedback)}
            />
          </StyledPopper>
        )}
    </div>
  );
}

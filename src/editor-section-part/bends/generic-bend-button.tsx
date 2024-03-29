import React from 'react';
import { BaseGlyphProps } from '@glyphs/glyphBaseProps';
import useAnchorElem from '@hooks/use-anchor-element';
import { BendType } from '../../alphatab-types/bend-type';
import StyledPopper from '../styled-popper';

interface GenericBendButtonProps {
  currentBendType: BendType;
  setCurrentBendType: (bendType: BendType) => void;
  quarter: React.ComponentType<BaseGlyphProps>;
  half: React.ComponentType<BaseGlyphProps>;
  full: React.ComponentType<BaseGlyphProps>;
  default: React.ComponentType<BaseGlyphProps>;
  disabled: boolean;
  isPopperOpen: boolean;
  setPopperOpen: () => void;
}

export default function GenericBendButton(props: GenericBendButtonProps) {
  const [anchorElem, setAnchorElem] = useAnchorElem();

  const onClick = (e: any) => {
    if (props.disabled) {
      return;
    }
    setAnchorElem(e);
    props.setPopperOpen();
  };

  const commonButtonProps = {
    hideTooltip: props.isPopperOpen,
    disabled: props.disabled,
    onClick,
  };

  const bendPopperModifiers = [
    {
      name: 'offset',
      options: {
        offset: [0, 8],
      },
    },
  ];

  return (
    <>
      {props.currentBendType === 'quarter'
        && <props.quarter {...commonButtonProps} selected />}
      {props.currentBendType === 'half'
        && <props.half {...commonButtonProps} selected />}
      {props.currentBendType === 'full'
        && <props.full {...commonButtonProps} selected />}
      {props.currentBendType === null
        && <props.default {...commonButtonProps} selected={false} />}
      {props.isPopperOpen && anchorElem
        && (
          <StyledPopper modifiers={bendPopperModifiers} open anchorEl={anchorElem} disablePortal>
            <props.quarter
              selected={props.currentBendType === 'quarter'}
              disabled={false}
              onClick={() => { props.setCurrentBendType('quarter'); }}
            />
            <props.half
              selected={props.currentBendType === 'half'}
              disabled={false}
              onClick={() => { props.setCurrentBendType('half'); }}
            />
            <props.full
              selected={props.currentBendType === 'full'}
              disabled={false}
              onClick={() => { props.setCurrentBendType('full'); }}
            />
          </StyledPopper>
        )}
    </>
  );
}

import React from 'react';
import HalfGlyph from '@glyphs/duration/half';
import WholeGlyph from '@glyphs/duration/whole';
import styled from '@emotion/styled';
import QuarterGlyph from '@glyphs/duration/quarter';
import EighthGlyph from '@glyphs/duration/eighth';
import SixTeenthGlyph from '@glyphs/duration/sixteenth';
import ThirtySecondGlyph from '@glyphs/duration/thirty-second';
import SixtyFourGlyph from '@glyphs/duration/sixty-four';
import Tie from '@glyphs/duration/tie';

const GlyphWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
});

const tempos = [
  [WholeGlyph, '1/1'],
  [HalfGlyph, '1/2'],
  [QuarterGlyph, '1/4'],
  [EighthGlyph, '1/8'],
  [SixTeenthGlyph, '1/16'],
  [ThirtySecondGlyph, '1/32'],
  [SixtyFourGlyph, '1/64'],
];

export default function HelpDuration() {
  return (
    <>
      {tempos.map(([Component, tempo]) => (
        <GlyphWrapper>
          <Component selected={false} disabled={false} />
          <div>
            {`${tempo} note duration`}
          </div>
        </GlyphWrapper>
      ))}
      <Tie disabled={false} selected={false} />
    </>
  );
}

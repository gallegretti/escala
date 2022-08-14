import React from 'react';
import SlideNoteGlyph from '@glyphs/effects/slide/slide';
import SlideInNoteGlyph from '@glyphs/effects/slide/slide-in';
import SlideOutNoteGlyph from '@glyphs/effects/slide/slide-out';
import EditorActionDispatcher from '../editor/editor-action-dispatcher';
import EditorScoreState from '../editor/editor-score-state';

type SlidePartProps = {
  editorScoreState: EditorScoreState;
  actionDispatcher: EditorActionDispatcher;
};

export default function SlidePart(props: SlidePartProps) {
  const setSlideOut = () => {
    if (props.editorScoreState.selectionSlideOut === null
      || props.editorScoreState.selectionSlideOut === alphaTab.model.SlideOutType.None) {
      props.actionDispatcher.setSlideOut(alphaTab.model.SlideOutType.OutUp);
    } else {
      props.actionDispatcher.setSlideOut(alphaTab.model.SlideOutType.None);
    }
  };

  const setSlideIn = () => {
    if (props.editorScoreState.selectionSlideIn === null
      || props.editorScoreState.selectionSlideIn === alphaTab.model.SlideInType.None) {
      props.actionDispatcher.setSlideIn(alphaTab.model.SlideInType.IntoFromBelow);
    } else {
      props.actionDispatcher.setSlideIn(alphaTab.model.SlideInType.None);
    }
  };

  const setSlide = () => {
    props.actionDispatcher.setSlide(!props.editorScoreState.selectionNoteSlide);
  };

  const slideIn = props.editorScoreState.selectionSlideIn !== null
    && props.editorScoreState.selectionSlideIn !== alphaTab.model.SlideInType.None;

  const slideOut = props.editorScoreState.selectionSlideOut !== null
    && props.editorScoreState.selectionSlideOut !== alphaTab.model.SlideOutType.None;

  const slide = props.editorScoreState.selectionNoteSlide ?? false;

  return (
    <>
      <SlideInNoteGlyph
        disabled={!props.editorScoreState.hasSelectedNote}
        onClick={setSlideIn}
        selected={slideIn}
      />
      <SlideNoteGlyph
        disabled={!props.editorScoreState.hasSelectedNote}
        onClick={setSlide}
        selected={slide}
      />
      <SlideOutNoteGlyph
        disabled={!props.editorScoreState.hasSelectedNote}
        onClick={setSlideOut}
        selected={slideOut && !slide}
      />
    </>
  );
}

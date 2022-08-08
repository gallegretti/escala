/* eslint-disable max-len */
/* eslint-disable max-classes-per-file */
import { BendState } from '../editor-skeleton/editor-controls/editor-controls';

class Note extends alphaTab.model.Note {
  /**
   * Alphatab stores individual bendpoints.
   * To make things easier we'll also store the overall bend state.
   */
  bendState?: BendState;
}

class AlphaTabApi extends alphaTab.AlphaTabApi {
}

class Tuning extends alphaTab.model.Tuning {}
class Beat extends alphaTab.model.Beat {}
class Bar extends alphaTab.model.Bar {}
class Voice extends alphaTab.model.Voice {}
class BendPoint extends alphaTab.model.BendPoint {}
class Score extends alphaTab.model.Score {}
class Track extends alphaTab.model.Track {}
class Bounds extends alphaTab.rendering.Bounds {}
class RenderFinishedEventArgs extends alphaTab.rendering.RenderFinishedEventArgs {}
class PlayerStateChangedEventArgs extends alphaTab.synth.PlayerStateChangedEventArgs {}
class NoteBounds extends alphaTab.rendering.NoteBounds {}
class ScoreRenderer extends alphaTab.rendering.ScoreRenderer {}
class Chord extends alphaTab.model.Chord {}

// Horrible hack so the enum type is correct
type Duration = (typeof alphaTab.model.Duration.Whole | typeof alphaTab.model.Duration.Half | typeof alphaTab.model.Duration.Quarter | typeof alphaTab.model.Duration.Eighth | typeof alphaTab.model.Duration.Sixteenth | typeof alphaTab.model.Duration.ThirtySecond | typeof alphaTab.model.Duration.SixtyFourth | typeof alphaTab.model.Duration.OneHundredTwentyEighth | typeof alphaTab.model.Duration.TwoHundredFiftySixth | typeof alphaTab.model.Duration.DoubleWhole | typeof alphaTab.model.Duration.QuadrupleWhole);
type PickStroke = (typeof alphaTab.model.PickStroke.None | typeof alphaTab.model.PickStroke.Up | typeof alphaTab.model.PickStroke.Down);
type AccentuationType = (typeof alphaTab.model.AccentuationType.Heavy | typeof alphaTab.model.AccentuationType.None | typeof alphaTab.model.AccentuationType.Normal);
type HarmonicType = (typeof alphaTab.model.HarmonicType.None | typeof alphaTab.model.HarmonicType.Natural | typeof alphaTab.model.HarmonicType.Artificial | typeof alphaTab.model.HarmonicType.Pinch | typeof alphaTab.model.HarmonicType.Tap | typeof alphaTab.model.HarmonicType.Semi | typeof alphaTab.model.HarmonicType.Feedback);
type DynamicValue = (typeof alphaTab.model.DynamicValue.PPP | typeof alphaTab.model.DynamicValue.PP | typeof alphaTab.model.DynamicValue.P | typeof alphaTab.model.DynamicValue.MP | typeof alphaTab.model.DynamicValue.MF | typeof alphaTab.model.DynamicValue.F | typeof alphaTab.model.DynamicValue.FF | typeof alphaTab.model.DynamicValue.FFF);
type SlideOutType = (typeof alphaTab.model.SlideOutType.None | typeof alphaTab.model.SlideOutType.Shift | typeof alphaTab.model.SlideOutType.Legato | typeof alphaTab.model.SlideOutType.OutUp | typeof alphaTab.model.SlideOutType.OutDown | typeof alphaTab.model.SlideOutType.PickSlideDown | typeof alphaTab.model.SlideOutType.PickSlideUp);

type BendType = typeof alphaTab.model.BendType;

type Staff = typeof alphaTab.model.Staff;

export type {
  AlphaTabApi,
  Note,
  Staff,
  Beat,
  Bar,
  Tuning,
  Voice,
  Chord,
  BendPoint,
  Score,
  Duration,
  DynamicValue,
  PickStroke,
  HarmonicType,
  BendType,
  AccentuationType,
  Track,
  Bounds,
  NoteBounds,
  SlideOutType,
  ScoreRenderer,
  RenderFinishedEventArgs,
  PlayerStateChangedEventArgs,
};

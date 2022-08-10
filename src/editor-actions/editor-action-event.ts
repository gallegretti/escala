import { ScoreInfo } from './actions/set-score-info/score-info';
import {
  AccentuationType,
  Bar,
  Beat,
  Chord,
  Duration,
  DynamicValue,
  HarmonicType,
  Note,
  PickStroke,
  Score,
  SlideInType,
  SlideOutType,
  Track,
  VibratoType,
} from '../alphatab-types/alphatab-types';
import { BendState } from '../editor-skeleton/editor-controls/editor-controls';
import TrackInfo from './actions/edit-track/track-info';

export interface EditorActionUndoable {
  type: string;
  data: {
    value: any;
    previousValue?: any;
  } & Record<string, any>
}

export interface EditorActionNotUndoable {
  type: string;
  data: Record<string, any>;
}

export interface EditorActionAddNote {
  type: 'add-note',
  data: {
    beat: Beat,
    note: Note,
  }
}

export interface EditorActionAddTrack {
  type: 'add-track',
  data: {
    score: Score;
    trackInfo: TrackInfo;
  }
}

export interface EditorActionEditTrack {
  type: 'edit-track',
  data: {
    track: Track;
    trackInfo: TrackInfo;
  }
}

export interface EditorActionSetTempo {
  type: 'set-tempo',
  data: {
    score: Score;
    tempo: number;
  }
}

export interface EditorActionSetDuration {
  type: 'set-duration',
  data: {
    beat: Beat;
    value: Duration;
    previousValue?: Duration;
  }
}

export interface EditorActionSetDynamics {
  type: 'set-dynamics',
  data: {
    beat: Beat,
    value: DynamicValue,
    previousValue?: DynamicValue,
  }
}

export interface EditorActionEventAddBeat {
  type: 'add-beat',
  data: {
    currentBeat: Beat,
    newBeat: Beat,
  }
}

export interface EditorActionEventAddBar {
  type: 'add-bar',
  data: {
    currentBar: Bar,
  }
}

export interface EditorActionEventRemoveNote {
  type: 'remove-note',
  data: {
    note: Note
  }
}

export interface EditorActionSetFret {
  type: 'set-fret',
  data: {
    note: Note,
    value: number,
    previousValue?: number
  }
}

export interface EditorActionSetScoreInfo {
  type: 'set-score-info',
  data: {
    score: Score,
    scoreInfo: ScoreInfo,
  }
}

export interface EditorActionSetText {
  type: 'set-text',
  data: {
    beat: Beat,
    value: string,
    previousValue?: string
  }
}

export interface EditorActionSetPalmMute {
  type: 'set-palm-mute',
  data: {
    note: Note,
    value: boolean,
    previousValue?: boolean,
  }
}

export interface EditorActionSetLetRing {
  type: 'set-let-ring',
  data: {
    note: Note,
    value: boolean,
    previousValue?: boolean,
  }
}

export interface EditorActionSetDeadNote {
  type: 'set-dead-note',
  data: {
    note: Note,
    value: boolean,
    previousValue?: boolean,
  }
}

export interface EditorActionSetAccentuation {
  type: 'set-accentuation',
  data: {
    note: Note;
    value: AccentuationType;
    previousValue?: AccentuationType;
  }
}

export interface EditorActionSetBend {
  type: 'set-bend',
  data: {
    note: Note,
    value: BendState,
    previousValue?: BendState,
  }
}

export interface EditorActionSetGhostNote {
  type: 'set-ghost-note',
  data: {
    note: Note,
    value: boolean,
    previousValue?: boolean,
  }
}

export interface EditorActionSetHarmonic {
  type: 'set-harmonic';
  data: {
    note: Note;
    value: HarmonicType;
    previousValue?: HarmonicType;
  }
}

export interface EditorActionSetOpenRepeat {
  type: 'set-open-repeat';
  data: {
    beat: Beat;
    value: boolean;
    previousValue?: boolean;
  }
}

export interface EditorActionSetCloseRepeat {
  type: 'set-close-repeat';
  data: {
    beat: Beat;
    value: number;
    previousValue?: number;
  }
}

export interface EditorActionSetHammer {
  type: 'set-hammer';
  data: {
    note: Note;
    value: boolean;
    previousValue?: boolean;
  }
}

export interface EditorActionSetTie {
  type: 'set-tie';
  data: {
    note: Note;
    value: boolean;
    previousValue?: boolean;
  }
}

export interface EditorActionSetSlide {
  type: 'set-slide';
  data: {
    note: Note;
    value: boolean;
    previousValue?: boolean;
  }
}

export interface EditorActionSetSlideIn {
  type: 'set-slide-in';
  data: {
    note: Note;
    value: SlideInType;
    previousValue?: SlideInType;
  }
}

export interface EditorActionSetSlideOut {
  type: 'set-slide-out';
  data: {
    note: Note;
    value: SlideOutType;
    previousValue?: SlideOutType;
  }
}

export interface EditorActionSetTap {
  type: 'set-tap',
  data: {
    note: Note,
    value: boolean,
    previousValue?: boolean,
  }
}

export interface EditorActionSetVibrato {
  type: 'set-vibrato',
  data: {
    note: Note,
    value: VibratoType,
    previousValue?: VibratoType,
  }
}

export interface EditorActionSetPickStroke {
  type: 'set-pick-stroke',
  data: {
    beat: Beat;
    value: PickStroke;
    previousValue?: PickStroke;
  }
}

export interface EditorActionSetChord {
  type: 'set-chord',
  data: {
    beat: Beat;
    value: Chord | null;
    previousValue?: Chord | null;
  }
}

export interface EditorActionResult {
  requiresRerender: boolean;
  requiresMidiUpdate: boolean;
}

export type EditorActionEvent
  = EditorActionAddNote
  | EditorActionAddTrack
  | EditorActionEditTrack
  | EditorActionEventAddBar
  | EditorActionEventAddBeat
  | EditorActionEventRemoveNote
  | EditorActionSetAccentuation
  | EditorActionSetBend
  | EditorActionSetChord
  | EditorActionSetCloseRepeat
  | EditorActionSetDeadNote
  | EditorActionSetDuration
  | EditorActionSetDynamics
  | EditorActionSetFret
  | EditorActionSetGhostNote
  | EditorActionSetHammer
  | EditorActionSetHarmonic
  | EditorActionSetLetRing
  | EditorActionSetOpenRepeat
  | EditorActionSetPalmMute
  | EditorActionSetPickStroke
  | EditorActionSetScoreInfo
  | EditorActionSetSlide
  | EditorActionSetSlideIn
  | EditorActionSetSlideOut
  | EditorActionSetTap
  | EditorActionSetTempo
  | EditorActionSetText
  | EditorActionSetTie
  | EditorActionSetVibrato;

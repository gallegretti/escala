import { ScoreInfo } from "./actions/set-score-info/score-info";
import { BendType } from "../bend-type";
import { AccentuationType, Beat, Duration, DynamicValue, HarmonicType, Note, PickStroke, Score } from "../../alphatab-types/alphatab-types";

export interface EditorActionEventAddNote {
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
        track: {
            name: string;
        }
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
        duration: Duration;
        previousDuration?: Duration;
    }
}

export interface EditorActionSetDynamics {
    type: 'set-dynamics',
    data: {
        beat: Beat,
        dynamics: DynamicValue,
        previousDynamics?: DynamicValue,
    }
}

export interface EditorActionEventAddBeat {
    type: 'add-beat',
    data: {
        currentBeat: Beat,
        newBeat: Beat,
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
        fret: number,
        previousFret?: number
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
        text: string,
        previousText?: string
    }
}

export interface EditorActionSetPalmMute {
    type: 'set-palm-mute',
    data: {
        note: Note,
        isPalmMute: boolean,
        previousPalmMute?: boolean,
    }
}

export interface EditorActionSetDeadNote {
    type: 'set-dead-note',
    data: {
        note: Note,
        isDeadNote: boolean,
        previousDeadNote?: boolean,
    }
}

export interface EditorActionSetAccentuation {
    type: 'set-accentuation',
    data: {
        note: Note;
        accentuation: AccentuationType;
        previousAccentuation?: AccentuationType;
    }
}


export interface EditorActionSetBend {
    type: 'set-bend',
    data: {
        note: Note,
        preBend: BendType,
        bend: BendType,
        release: BendType,
        previousBend?: any,
    }
}

export interface EditorActionSetGhostNote {
    type: 'set-ghost-note',
    data: {
        note: Note,
        isGhost: boolean,
        previousGhost?: boolean,
    }
}

export interface EditorActionSetHarmonic {
    type: 'set-harmonic';
    data: {
        note: Note;
        harmonic: HarmonicType;
        previousHarmonic?: HarmonicType;
    }
}

export interface EditorActionSetTap {
    type: 'set-tap',
    data: {
        note: Note,
        isLeftHandTap: boolean,
        previousIsLeftHalpTap?: boolean,
    }
}

export interface EditorActionSetVibrato {
    type: 'set-vibrato',
    data: {
        note: Note,
        isVibrato: boolean,
        previousIsVibrato?: boolean,
    }
}

export interface EditorActionSetPickStroke {
    type: 'set-pick-stroke',
    data: {
        beat: Beat;
        pickStroke: PickStroke;
        previousPickStroke?: PickStroke;
    }
}

export interface EditorActionResult {
    requiresRerender: boolean;
    requiresMidiUpdate: boolean;
}

export type EditorActionEvent = EditorActionEventAddNote
| EditorActionEventRemoveNote
| EditorActionSetFret
| EditorActionSetPalmMute
| EditorActionSetText
| EditorActionEventAddBeat
| EditorActionSetDuration
| EditorActionSetDynamics
| EditorActionSetGhostNote
| EditorActionSetAccentuation
| EditorActionSetDeadNote
| EditorActionSetPickStroke
| EditorActionSetHarmonic
| EditorActionSetScoreInfo
| EditorActionSetBend
| EditorActionSetTap
| EditorActionSetVibrato
| EditorActionAddTrack
| EditorActionSetTempo;
   
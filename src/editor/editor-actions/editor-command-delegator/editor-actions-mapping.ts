import { EditorActionEvent } from "../editor-action-event";
import addBeatAction from "../actions/add-beat/add-beat";
import addNoteAction from "../actions/add-note/add-note";
import EditorActionInterface from "../actions/editor-action.interface";
import removeNoteAction from "../actions/remote-note/remove-note";
import setAccentuationAction from "../actions/set-accentuation/set-accentuation";
import setBendAction from "../actions/set-bend/set-bend";
import setDeadNoteAction from "../actions/set-dead-note/set-dead-note";
import setDurationAction from "../actions/set-duration/set-duration";
import setDynamicAction from "../actions/set-dynamics/set-dynamics";
import setFretAction from "../actions/set-fret/set-fret";
import setGhostNoteAction from "../actions/set-ghost-note/set-ghost-note";
import setHarmonic from "../actions/set-harmonic/set-harmonic";
import setPalmMuteAction from "../actions/set-palm-mute/set-palm-mute";
import setPickStroke from "../actions/set-pick-stroke/set-pick-stroke";
import setScoreInfo from "../actions/set-score-info/set-score-info";
import setTextAction from "../actions/set-text/set-text";
import setTapAction from "../actions/set-tap/set-tap";
import setTempoAction from "../actions/set-tempo/set-tempo";
import setVibratoAction from "../actions/set-vibrato/set-vibrato";
import addTrackAction from "../actions/add-track/add-track";

const mapping: Record<string, EditorActionInterface<EditorActionEvent>> = {
    'add-beat': addBeatAction,
    'add-note': addNoteAction,
    'add-track': addTrackAction,
    'remove-note': removeNoteAction,
    'set-accentuation': setAccentuationAction,
    'set-bend': setBendAction,
    'set-dead-note': setDeadNoteAction,
    'set-duration': setDurationAction,
    'set-dynamics': setDynamicAction,
    'set-fret': setFretAction,
    'set-ghost-note': setGhostNoteAction,
    'set-harmonic': setHarmonic,
    'set-palm-mute': setPalmMuteAction,
    'set-pick-stroke': setPickStroke,
    'set-score-info': setScoreInfo,
    'set-tap': setTapAction,
    'set-tempo': setTempoAction,
    'set-text': setTextAction,
    'set-vibrato': setVibratoAction,
}

export default mapping;

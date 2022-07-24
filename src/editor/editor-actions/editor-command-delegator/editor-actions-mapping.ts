import { EditorActionEvent } from '../editor-action-event';
import EditorActionInterface from '../actions/editor-action.interface';

import addBarAction from '../actions/add-bar/add-bar';
import addBeatAction from '../actions/add-beat/add-beat';
import addNoteAction from '../actions/add-note/add-note';
import addTrackAction from '../actions/add-track/add-track';
import editTrackAction from '../actions/edit-track.ts/edit-track';
import removeNoteAction from '../actions/remote-note/remove-note';
import setAccentuationAction from '../actions/set-accentuation/set-accentuation';
import setBendAction from '../actions/set-bend/set-bend';
import setChordAction from '../actions/set-chord/set-chord';
import setCloseRepeatAction from '../actions/set-close-repeat/set-close-repeat';
import setDeadNoteAction from '../actions/set-dead-note/set-dead-note';
import setDurationAction from '../actions/set-duration/set-duration';
import setDynamicAction from '../actions/set-dynamics/set-dynamics';
import setFretAction from '../actions/set-fret/set-fret';
import setGhostNoteAction from '../actions/set-ghost-note/set-ghost-note';
import setHammerAction from '../actions/set-hammer/set-hammer';
import setHarmonic from '../actions/set-harmonic/set-harmonic';
import setOpenRepeatAction from '../actions/set-open-repeat/set-open-repeat';
import setPalmMuteAction from '../actions/set-palm-mute/set-palm-mute';
import setPickStroke from '../actions/set-pick-stroke/set-pick-stroke';
import setScoreInfo from '../actions/set-score-info/set-score-info';
import setSlideAction from '../actions/set-slide/set-slide';
import setTapAction from '../actions/set-tap/set-tap';
import setTempoAction from '../actions/set-tempo/set-tempo';
import setTextAction from '../actions/set-text/set-text';
import setTieAction from '../actions/set-tie/set-tie';
import setVibratoAction from '../actions/set-vibrato/set-vibrato';

const mapping: Record<string, EditorActionInterface<EditorActionEvent>> = {
  'add-bar': addBarAction,
  'add-beat': addBeatAction,
  'add-note': addNoteAction,
  'add-track': addTrackAction,
  'edit-track': editTrackAction,
  'remove-note': removeNoteAction,
  'set-accentuation': setAccentuationAction,
  'set-bend': setBendAction,
  'set-chord': setChordAction,
  'set-close-repeat': setCloseRepeatAction,
  'set-dead-note': setDeadNoteAction,
  'set-duration': setDurationAction,
  'set-dynamics': setDynamicAction,
  'set-fret': setFretAction,
  'set-ghost-note': setGhostNoteAction,
  'set-hammer': setHammerAction,
  'set-harmonic': setHarmonic,
  'set-open-repeat': setOpenRepeatAction,
  'set-palm-mute': setPalmMuteAction,
  'set-pick-stroke': setPickStroke,
  'set-score-info': setScoreInfo,
  'set-slide': setSlideAction,
  'set-tap': setTapAction,
  'set-tempo': setTempoAction,
  'set-text': setTextAction,
  'set-tie': setTieAction,
  'set-vibrato': setVibratoAction,
};

export default mapping;

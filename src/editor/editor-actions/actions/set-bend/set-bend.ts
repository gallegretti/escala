import { EditorActionResult, EditorActionSetBend } from '../../editor-action-event';
import EditorActionInterface from '../editor-action.interface';
import { getBendPoints, getBendState } from './set-bend-lookup-table';
import { BendState } from '../../../../components/editor-controls/editor-controls';
import { Note } from '../../../../alphatab-types/alphatab-types';

class SetBendAction extends EditorActionInterface<EditorActionSetBend> {
  do(action: EditorActionSetBend): EditorActionResult {
    const {
      note, bend, preBend, release,
    } = action.data;
    action.data.previousBend = getBendState(note);
    this.applyBendStateToNote({ preBend, bend, release }, note);
    return {
      requiresRerender: true,
      requiresMidiUpdate: true,
    };
  }

  undo(action: EditorActionSetBend): EditorActionResult {
    const { note, previousBend } = action.data;
    this.applyBendStateToNote(previousBend, note);
    return {
      requiresRerender: true,
      requiresMidiUpdate: true,
    };
  }

  applyBendStateToNote(bendState: BendState, note: Note) {
    note.bendState = bendState;
    const newBendPoints = getBendPoints(bendState);
    if (newBendPoints.length > 0) {
      note.bendPoints = [];
      note.maxBendPoint = null;
      newBendPoints.forEach((bendPoint) => {
        note.addBendPoint(bendPoint);
      });
      note.bendType = 1;
      note.bendStyle = 0;
    } else {
      note.bendPoints = [];
      note.maxBendPoint = null;
      note.bendType = 0;
      note.bendStyle = 0;
    }
  }
}

export default new SetBendAction();

import { EditorActionResult, EditorActionSetBend } from '../../editor-action-event';
import { getBendPoints, getBendState } from './set-bend-lookup-table';
import { BendState } from '../../../editor-skeleton/editor-controls/editor-controls';
import { Note } from '../../../alphatab-types/alphatab-types';
import EditorActionWithUndo from '../editor-action-with-undo';

class SetBendAction extends EditorActionWithUndo<EditorActionSetBend> {
  do(action: EditorActionSetBend): EditorActionResult {
    const {
      note, value,
    } = action.data;
    action.data.previousValue = getBendState(note);
    this.applyBendStateToNote(value, note);
    return {
      requiresRerender: true,
      requiresMidiUpdate: true,
    };
  }

  private applyBendStateToNote(bendState: BendState, note: Note) {
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

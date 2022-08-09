import { EditorActionResult, EditorActionEventAddBar } from '../../editor-action-event';
import EditorActionWithoutUndo from '../editor-action-without-undo';

class AddBarAction extends EditorActionWithoutUndo<EditorActionEventAddBar> {
  do(action: EditorActionEventAddBar): EditorActionResult {
    const { currentBar } = action.data;
    // Create new bar
    const newBar = new alphaTab.model.Bar();
    newBar.clef = currentBar.clef;
    newBar.clefOttava = currentBar.clefOttava;
    newBar.index = currentBar.index + 1;
    newBar.simileMark = currentBar.simileMark;
    // Create new master bar for this bar
    currentBar.staff.track.score.addMasterBar(new alphaTab.model.MasterBar());
    // Configure default voices and beats
    newBar.addVoice(new alphaTab.model.Voice());
    newBar.addVoice(new alphaTab.model.Voice());
    // It seems like alphatab required the next bar to have at least one beat otherwise we'll get an error
    newBar.voices[0].addBeat(new alphaTab.model.Beat());
    newBar.voices[1].addBeat(new alphaTab.model.Beat());
    currentBar.staff.addBar(newBar);
    currentBar.finish(null as any, null as any);
    return {
      requiresRerender: true,
      requiresMidiUpdate: true,
    };
  }
}

export default new AddBarAction();

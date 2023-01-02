import { EditorActionResult, EditorActionEventAddBar } from '../../editor-action-event';
import EditorActionInterface from '../editor-action.interface';

 * Adds a new bar after the given 'currentBar'.
 * NOTE: Won't work if 'currentBar' is not the last one.
 */
class AddBarAction extends EditorActionInterface<EditorActionEventAddBar> {
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
    // Create one beat on the new Bar
    newBar.voices[0].addBeat(new alphaTab.model.Beat());
    newBar.voices[1].addBeat(new alphaTab.model.Beat());
    currentBar.staff.addBar(newBar);
    currentBar.finish(null as any, null as any);
    return {
      requiresRerender: true,
      requiresMidiUpdate: true,
    };
  }

  undo(action: EditorActionEventAddBar): EditorActionResult {
    const { currentBar } = action.data;
    const barToRemove = currentBar.nextBar;
    const masterBarToRemove = barToRemove?.masterBar;
    barToRemove?.staff.bars.splice(barToRemove.index, 1);
    masterBarToRemove?.score.masterBars.splice(masterBarToRemove.index, 1);
    currentBar.masterBar.nextMasterBar = null;
    currentBar.nextBar = null;
    currentBar.voices.forEach((voice) => {
      voice.beats[voice.beats.length - 1].nextBeat = null
    });
    currentBar?.finish(null as any, {} as any);
    return {
      requiresRerender: true,
      requiresMidiUpdate: true,
    };
  }

  canUndo(): boolean {
    return true;
  }
}

export default new AddBarAction();

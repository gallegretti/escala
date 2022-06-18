import { EditorActionResult, EditorActionEventAddBeat } from '../../editor-action-event';
import EditorActionInterface from '../editor-action.interface';

class AddBeatAction extends EditorActionInterface<EditorActionEventAddBeat> {
  do(action: EditorActionEventAddBeat): EditorActionResult {
    const { currentBeat, newBeat } = action.data;
    const isLatestBeatOnChain = currentBeat.nextBeat === null;
    if (!isLatestBeatOnChain) {
      return {
        requiresRerender: false,
        requiresMidiUpdate: false,
      };
    }
    currentBeat.voice.addBeat(newBeat);
    currentBeat.voice.finish(null as any, null as any);
    return {
      requiresRerender: true,
      requiresMidiUpdate: true,
    };
  }

  undo(action: EditorActionEventAddBeat): EditorActionResult {
    const { currentBeat, newBeat } = action.data;
    // Alphatab's 'Voice' model doesn't have a 'removeBeat' function.
    // If it eventually gets one, use it in here
    const indexToRemove = currentBeat.voice.beats.indexOf(newBeat);
    if (indexToRemove === -1) {
      return {
        requiresMidiUpdate: false,
        requiresRerender: false,
      };
    }
    currentBeat.nextBeat = null;
    currentBeat.voice.beats.splice(indexToRemove, 1);
    currentBeat.voice.finish(null as any, null as any);
    return {
      requiresRerender: true,
      requiresMidiUpdate: true,
    };
  }
}

export default new AddBeatAction();

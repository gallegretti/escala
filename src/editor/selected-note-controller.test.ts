import { mock } from 'jest-mock-extended';
import { Beat, Note, ScoreRenderer } from '../alphatab-types/alphatab-types';
import SelectedNoteController from './selected-note-controller';

describe('selected-note-controller', () => {
    describe('toggle-note-selection', () => {
        const selectedNoteController = new SelectedNoteController(mock<ScoreRenderer>());
        const beat = mock<Beat>();
        const note = mock<Note>({
            string: 2,
            beat
        });
        selectedNoteController.toggleNoteSelection(note);
        {
            const selectedSlot = selectedNoteController.getSelectedSlot();
            expect(selectedSlot).toBeDefined();
            expect(selectedSlot?.string).toEqual(2);
            expect(selectedSlot?.beat).toEqual(beat);
            expect(selectedSlot?.note).toEqual(note);
        }
        selectedNoteController.toggleNoteSelection(note);
        {
            const selectedSlot = selectedNoteController.getSelectedSlot();
            expect(selectedSlot).toBeNull();
        }
    });

    describe('move-selected-note-up', () => {
        test('from slot to slot', () => {
            const selectedNoteController = new SelectedNoteController(mock<ScoreRenderer>());
            const beat = mock<Beat>({
                notes: []
            });
            selectedNoteController.setSelectedSlot({
                string: 1,
                beat,
            })
            selectedNoteController.moveSelectedNoteUp();
            const newSelectedSlot = selectedNoteController.getSelectedSlot();
            expect(newSelectedSlot).not.toBeNull();
            expect(newSelectedSlot?.string).toEqual(2);
            expect(newSelectedSlot?.beat).toEqual(beat);
            expect(newSelectedSlot?.note).toBeUndefined();
        });

        test('from slot to note', () => {
            const selectedNoteController = new SelectedNoteController(mock<ScoreRenderer>());
            const secondStringNote = mock<Note>({
                string: 2
            });
            const beat = mock<Beat>({
                notes: [secondStringNote]
            });
            selectedNoteController.setSelectedSlot({
                string: 1,
                beat,
            })
            selectedNoteController.moveSelectedNoteUp();
            const newSelectedSlot = selectedNoteController.getSelectedSlot();
            expect(newSelectedSlot).not.toBeNull();
            expect(newSelectedSlot?.string).toEqual(2);
            expect(newSelectedSlot?.beat).toEqual(beat);
            expect(newSelectedSlot?.note).toEqual(secondStringNote)
        });

        test('from note to slot', () => {
            const selectedNoteController = new SelectedNoteController(mock<ScoreRenderer>());
            const secondStringNote = mock<Note>({
                string: 2
            });
            const beat = mock<Beat>({
                notes: [secondStringNote]
            });
            secondStringNote.beat = beat;
            selectedNoteController.toggleNoteSelection(secondStringNote);
            selectedNoteController.moveSelectedNoteUp();
            const newSelectedSlot = selectedNoteController.getSelectedSlot();
            expect(newSelectedSlot).not.toBeNull();
            expect(newSelectedSlot?.string).toEqual(3);
            expect(newSelectedSlot?.beat).toEqual(beat);
            expect(newSelectedSlot?.note).toBeUndefined();
        });
    });
});

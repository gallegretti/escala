import { mock } from 'jest-mock-extended';
import addBeatAction from './add-beat';
import { EditorActionEventAddBeat } from '../../editor-action-event';
import { Beat, Voice } from '../../../../alphatab-types/alphatab-types';

describe('add-beat', () => {
    describe('do', () => {
        test('should add a new beat correctly', () => {
            const currentBeat = mock<Beat>({
                notes: [],
                voice: mock<Voice>({
                    addBeat: jest.fn(),
                    finish: jest.fn(),
                }),
                nextBeat: null,
                addNote: jest.fn(),
                finish: jest.fn(),
            });
            const newBeat = mock<Beat>({
                notes: [],
                addNote: jest.fn(),
                finish: jest.fn(),
            });
            const event: EditorActionEventAddBeat = {
                type: 'add-beat',
                data: {
                    currentBeat,
                    newBeat
                }
            }
            const result = addBeatAction.do(event);
            expect(result.requiresRerender).toBe(true);
            expect(result.requiresMidiUpdate).toBe(true);
            expect(currentBeat.voice.addBeat).toHaveBeenCalledWith(newBeat);
            expect(currentBeat.voice.finish).toHaveBeenCalled();
        });
    });

    describe('undo', () => {
        test('should remove the beat', () => {
            const voice = mock<Voice>({
                addBeat: jest.fn(),
                finish: jest.fn(),
            });
            const currentBeat = mock<Beat>({
                notes: [],
                voice,
                addNote: jest.fn(),
                finish: jest.fn(),
            });
            const newBeat = mock<Beat>({
                notes: [],
                voice,
                addNote: jest.fn(),
                finish: jest.fn(),
            });
            currentBeat.nextBeat = newBeat;
            newBeat.previousBeat = currentBeat;
            voice.beats = [currentBeat, newBeat];
            const event: EditorActionEventAddBeat = {
                type: 'add-beat',
                data: {
                    currentBeat,
                    newBeat
                }
            }
            const result = addBeatAction.undo(event);
            expect(result.requiresRerender).toBe(true);
            expect(result.requiresMidiUpdate).toBe(true);
            expect(voice.beats).toEqual([currentBeat]);
            expect(currentBeat.voice.finish).toHaveBeenCalled();
        })
    });
});

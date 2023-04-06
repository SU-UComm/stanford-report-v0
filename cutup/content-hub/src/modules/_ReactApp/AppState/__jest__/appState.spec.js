import {appStateReducer} from '../AppState.jsx';

// Mock localStorage
class LocalStorageMock {
    constructor() {
        this.store = {};
    }
    clear() {
        this.store = {};
    }
    getItem(key) {
        return this.store[key] || null;
    }
    setItem(key, value) {
        this.store[key] = String(value);
    }
    removeItem(key) {
        delete this.store[key];
    }
}
global.localStorage = new LocalStorageMock();

describe('appStateReducer()', () => {
    it('addExampleAppData', () => {
        const initialState = {
            exampleAppData: [],
        };
        const expectedState = {
            exampleAppData: ['test'],
        };
        const updateAction = {type: 'addExampleAppData', data: 'test'};
        const updatedState = appStateReducer(initialState, updateAction);
        expect(updatedState).toEqual(expectedState);
    });

    it('removeExampleAppData', () => {
        const initialState = {
            exampleAppData: ['test'],
        };
        const expectedState = {
            exampleAppData: [],
        };
        const updateAction = {type: 'removeExampleAppData', data: 'test'};
        const updatedState = appStateReducer(initialState, updateAction);
        expect(updatedState).toEqual(expectedState);
    });

    it('default', () => {
        const initialState = {
            exampleAppData: [],
        };

        const updateAction = {type: 'notSupportedType', initialState};
        expect(() => {
            appStateReducer(initialState, updateAction);
        }).toThrow('Unhandled action type: notSupportedType');
    });
});

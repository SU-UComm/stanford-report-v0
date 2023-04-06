import {dataStateReducer} from '../DataState.jsx';

describe('dataStateReducer()', () => {
    it('setData', () => {
        const initialState = {
            exampleData: 1,
        };
        const expectedState = {
            exampleData: 2,
        };
        const updateAction = {type: 'setData', data: 2};
        const updatedState = dataStateReducer(initialState, updateAction);
        expect(updatedState).toEqual(expectedState);
    });

    it('clearData', () => {
        const initialState = {
            exampleData: 2,
        };
        const expectedState = {
            exampleData: '',
        };
        const updateAction = {type: 'clearData'};
        const updatedState = dataStateReducer(initialState, updateAction);
        expect(updatedState).toEqual(expectedState);
    });

    it('default', () => {
        const initialState = {
            exampleData: 1,
        };

        const updateAction = {type: 'notSupportedType', initialState};
        expect(() => {
            dataStateReducer(initialState, updateAction);
        }).toThrow('Unhandled action type: notSupportedType');
    });
});

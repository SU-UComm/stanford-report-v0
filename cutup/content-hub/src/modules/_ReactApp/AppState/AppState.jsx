import React from 'react';
import PropTypes from 'prop-types';
import {loadAppState, saveAppState} from './appStateHelpers';

const AppStateContext = React.createContext();
const AppDispatchContext = React.createContext();

export const appStateReducer = (state, action) => {
    switch (action.type) {
        case 'addExampleAppData': {
            let newExampleAppData = [...state.exampleAppData];
            newExampleAppData.push(action.data);
            saveAppState('exampleAppData', newExampleAppData);
            return {
                ...state,
                exampleAppData: newExampleAppData,
            };
        }
        case 'removeExampleAppData': {
            let newExampleAppData = [...state.exampleAppData];
            newExampleAppData = newExampleAppData.filter((e) => e !== action.data);
            saveAppState('exampleAppData', newExampleAppData);
            return {
                ...state,
                exampleAppData: newExampleAppData,
            };
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
};

const AppStateProvider = (props) => {
    let initialData = props.defaultData;

    if (!loadAppState()) {
        // InitialData not present - use props.defaultData
        saveAppState(null, initialData);
    } else {
        // InitialData present - load it
        initialData = loadAppState();
        saveAppState(null, initialData);
    }

    const [state, dispatch] = React.useReducer(appStateReducer, initialData);

    return (
        <AppStateContext.Provider value={state}>
            <AppDispatchContext.Provider value={dispatch}>{props.children}</AppDispatchContext.Provider>
        </AppStateContext.Provider>
    );
};

const useAppState = () => {
    const context = React.useContext(AppStateContext);
    if (context === undefined) {
        throw new Error('useAppState must be used within a AppStateProvider');
    }
    return context;
};

const useAppDispatch = () => {
    const context = React.useContext(AppDispatchContext);
    if (context === undefined) {
        throw new Error('useAppDispatch must be used within a AppStateProvider');
    }
    return context;
};

AppStateProvider.propTypes = {
    defaultData: PropTypes.object,
    children: PropTypes.any,
};

export {AppStateProvider, useAppState, useAppDispatch};

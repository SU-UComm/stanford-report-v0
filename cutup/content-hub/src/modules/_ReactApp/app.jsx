// Imports
import React from 'react';
import {AppStateProvider} from 'src/modules/_ReactApp/AppState/AppState.jsx';
import {DataStateProvider} from 'src/modules/_ReactApp/DataState/DataState.jsx';
import {Main} from 'src/modules/_ReactApp/Main/Main.jsx';

const dataStateDefaultData = require('modules/_ReactApp/DataState/dataStateDefaultData.json');
let appStateDefaultData = require('modules/_ReactApp/AppState/appStateDefaultData.json');
appStateDefaultData.testWindowVariable = window.testWindowVariable || false;

export const App = () => {
    return (
        <AppStateProvider defaultData={appStateDefaultData}>
            <DataStateProvider defaultData={dataStateDefaultData}>
                <div className="container">
                    <Main />
                </div>
            </DataStateProvider>
        </AppStateProvider>
    );
};

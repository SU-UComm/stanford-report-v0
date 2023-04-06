import React from 'react';
import ReactDom from 'react-dom';
import {AppStateProvider} from '../../AppState/AppState.jsx';
import {DataStateProvider} from '../../DataState/DataState.jsx';
import {Main} from '../../Main/Main.jsx';

const dataStateDefaultData = require('../../DataState/dataStateDefaultData.json');
const appStateDefaultData = require('../../AppState/appStateDefaultData.json');

test('ReactContexts - renders', () => {
    const div = document.createElement('div');

    ReactDom.render(
        <AppStateProvider defaultData={appStateDefaultData}>
            <DataStateProvider defaultData={dataStateDefaultData}>
                <div className="container">
                    <Main />
                </div>
            </DataStateProvider>
        </AppStateProvider>,
        div,
    );

    expect([...div.querySelectorAll('.react-contexts')]).toHaveLength(1);
    expect([...div.querySelectorAll('.react-contexts fieldset')]).toHaveLength(2);
});

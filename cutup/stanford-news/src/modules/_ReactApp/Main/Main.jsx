import React from 'react';
import {AppStateExample} from '../AppStateExample/AppStateExample.jsx';
import {DataStateExample} from '../DataStateExample/DataStateExample.jsx';

export const Main = () => {
    return (
        <div className="react-contexts">
            <h3 className="react-contexts__title">
                Example: <span className="react-contexts__subtitle">React Contexts</span>
            </h3>

            <AppStateExample />
            <hr />
            <DataStateExample />
        </div>
    );
};

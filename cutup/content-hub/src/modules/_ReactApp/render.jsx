// Imports
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './app.jsx';

// Import CSS
import './app.scss';

var react_app_wrapper = document.querySelector('#react__app-wrapper');

// Don't run on a non-React page
if (react_app_wrapper !== null) {
    ReactDOM.render(
        <div className="react__app-content">
            <App />
        </div>,
        react_app_wrapper,
    );
}

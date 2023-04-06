import {getFromStorage, setToStorage} from 'helpers/localStorageHelpers';

/**
 * Load appState data from local storage
 * @param {string} key optional: key value
 * @returns {object} appState data from local storage
 */
export const loadAppState = (key) => {
    return getFromStorage('reactStarterAppState', key);
};

/**
 * Save appState data to local storage
 * @param {string} key optional: key value to set
 * @param {any} value value to set - if not provided will set to entire appState
 * @returns {object} entire appState data object
 */
export const saveAppState = (key, value) => {
    return setToStorage('reactStarterAppState', key, value);
};

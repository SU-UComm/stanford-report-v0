import {getFromStorage, setToStorage} from 'helpers/localStorageHelpers';

/**
 * Load dataState data from local storage
 * @param {string} key optional: key value
 * @returns {object} appState data from local storage
 */
export const loadDataState = (key) => {
    return getFromStorage('reactStarterDataState', key);
};

/**
 * Save dataState data to local storage
 * @param {string} key optional: key value to set
 * @param {any} value value to set - if not provided will set to entire dataState
 * @returns {object} entire dataState data object
 */
export const saveDataState = (key, value) => {
    return setToStorage('reactStarterDataState', key, value);
};

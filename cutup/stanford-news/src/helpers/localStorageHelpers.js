/**
 * Get data from local storage
 * @param {string} keyname local storage keyname
 * @param {string} key optional: key value
 * @returns {object} data from local storage
 */
export const getFromStorage = (keyname, key) => {
    if (key) {
        return JSON.parse(localStorage.getItem(keyname))[key];
    }
    return JSON.parse(localStorage.getItem(keyname));
};

/**
 * Set data to local storage
 * @param {string} keyname local storage keyname
 * @param {string} key optional: key value to set
 * @param {any} value value to set - if not provided will set to entire keyname
 * @returns {object} entire data object
 */
export const setToStorage = (keyname, key, value) => {
    let appState = getFromStorage(keyname) || {};
    if (key) {
        appState[key] = value;
    } else {
        appState = value;
    }

    localStorage.setItem(keyname, JSON.stringify(appState));
    return appState;
};

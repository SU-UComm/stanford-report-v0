/**
 * Remove given item from array
 * @param {any} itemToBeRemoved item you want to remove
 * @param {Array} array array to remove from
 * @returns {Array} array without the removed element
 */
export const arrayHelperRemoveElementByValue = (itemToBeRemoved, array) => {
    return array.filter((item) => item !== itemToBeRemoved);
};

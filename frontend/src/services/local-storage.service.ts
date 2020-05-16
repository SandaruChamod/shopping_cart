/**
 * Get data from local storage.
 * @param key - local storage key name.
 */
export const getFromLocalStorage = (key: string) => {
  return localStorage.getItem(key);
};

/**
 * Set data to local storage.
 * @param key - local storage key name.
 * @param value - local storage key specific value.
 */
export const setToLocalStorage = (key: string, value: string): void => {
  localStorage.setItem(key, value);
};

/**
 * Delete data from local storage.
 * @param key - local storage key name.
 */
export const deleteFromLocalStorage = (key: string): void => {
  localStorage.removeItem(key);
};

export const getDataFromLocalStorage = (key: string) => {
  return window.localStorage.getItem(key);
};

export const setLocalStorage = (key: string, value: string) => {
  return window.localStorage.setItem(key, value);
};

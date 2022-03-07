export const getDataFromLocalStorage = (key: string) => {
  return window.localStorage.getItem(key);
};

export const setLocalStorage = (key: string, value: string) => {
  return window.localStorage.setItem(key, value);
};

export const deleteLocalStorage = (key: string) => {
  return window.localStorage.removeItem(key);
};

const isValid = (v: unknown) => {
  return v === undefined || v === null;
};

export const cleanObject = (obj: { [key: string]: unknown }) => {
  const res = { ...obj };
  const keys = Object.keys(res);
  for (let i = 0; i < keys.length; ++i) {
    if (res.hasOwnProperty(keys[i]) && isValid(res[keys[i]])) {
      delete res[keys[i]];
    }
  }
  return res;
};

export const cleanEmptyString = (obj: { [key: string]: unknown }) => {
  const res = { ...obj };
  const keys = Object.keys(res);
  for (let i = 0; i < keys.length; ++i) {
    if (
      (res.hasOwnProperty(keys[i]) && isValid(res[keys[i]])) ||
      res[keys[i]] === ""
    ) {
      delete res[keys[i]];
    }
  }
  return res;
};

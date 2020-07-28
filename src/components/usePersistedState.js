import { useState, useEffect } from "react";

const getLocalValue = (key, initialValue) => {
  const localValue = JSON.parse(localStorage.getItem(key));
  if (localValue) {
    return localValue;
  } else {
    return initialValue;
  }
};

export const usePersistedState = (key, initialValue) => {
  // localStorage.clear();
  const [value, setValue] = useState(() => getLocalValue(key, initialValue));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
};

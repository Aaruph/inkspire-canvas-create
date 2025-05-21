
import { useState } from "react";

export const useLocalStorage = () => {
  const [value, setValue] = useState<string | null>(null);

  const getItem = (key: string) => {
    const item = localStorage.getItem(key);
    setValue(item);
    return item;
  };

  const setItem = (key: string, value: string) => {
    localStorage.setItem(key, value);
    setValue(value);
  };

  const removeItem = (key: string) => {
    localStorage.removeItem(key);
    setValue(null);
  };

  return { value, getItem, setItem, removeItem };
};

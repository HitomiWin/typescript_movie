import { useState, useEffect } from "react";

const useLocalStorage = (key: string, defaultValue = [Number]) => {
  const [value, setValue] = useState(() => {
    // It used callback because something returns

    const jsonValue = localStorage.getItem(key);
    return jsonValue ? JSON.parse(jsonValue) : defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value)); //set values..
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;

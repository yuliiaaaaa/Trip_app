import { useState } from "react";

export function useLocalStorage<T>(
  key: string,
  startValue: T
): [T, (newValue: T) => void] {
  const [value, setValue] = useState<T>(() => {
    try {
      const data = localStorage.getItem(key);
      if (data !== null && data !== undefined) {
        return JSON.parse(data);
      }
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
    return startValue;
  });

  const save = (newValue: T) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  };

  return [value, save];
}

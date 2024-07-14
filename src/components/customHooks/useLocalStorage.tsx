import { useEffect, useState } from 'react';

type LocalStorageState<T extends string> = [T, (value: T) => void];

function useLocalStorage<T extends string>(
  initialValue = undefined,
  key: string,
): LocalStorageState<T> {
  const getValue = () => {
    const storage = localStorage.getItem(key);

    if (storage) {
      return JSON.parse(storage);
    }

    return initialValue;
  };

  const [value, setValue] = useState(getValue);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}

export default useLocalStorage;

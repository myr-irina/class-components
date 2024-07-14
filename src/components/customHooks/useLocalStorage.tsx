import { useEffect, useState } from 'react';

type LocalStorageState<T extends string> = [T, (value: T) => void];

function useLocalStorage<T extends string>(key: string): LocalStorageState<T> {
  const initialState: T = '' as T;

  const [searchQuery, setSearchQuery] = useState<T>(initialState);

  useEffect(() => {
    const savedSearchQuery = localStorage.getItem(key);
    if (savedSearchQuery) {
      setSearchQuery(savedSearchQuery as unknown as T);
    } else {
      setSearchQuery(initialState);
    }
  }, []);

  useEffect(() => {
    return () => {
      localStorage.setItem(key, searchQuery);
    };
  }, [searchQuery]);

  return [searchQuery, setSearchQuery];
}

export default useLocalStorage;

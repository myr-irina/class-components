import React, { useEffect, useState } from 'react';

function useLocalStorage() {
  const [searchQuery, setsearchQuery] = useState('');

  useEffect(() => {
    const savedSearchQuery = localStorage.getItem('searhQuery');
    if (savedSearchQuery) {
      setsearchQuery(savedSearchQuery);
    } else {
      setsearchQuery('');
    }
  }, []);

  useEffect(() => {
    return () => {
      localStorage.setItem('searchQuery', searchQuery);
    };
  }, [searchQuery]);
}

export default useLocalStorage;

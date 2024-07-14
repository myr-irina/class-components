import './App.css';
import React, {
  PropsWithChildren,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import ResultsList, {
  ResultItem,
  SingleResult,
} from './components/ResultsList/ResultsList';
import { BASE_URL } from './constants';
import SearchButton from './components/SearchButton/SearchButton';
import Spinner from './components/Spinner/Spinner';
import useLocalStorage from './components/customHooks/useLocalStorage';

interface AppState {
  searchTerm: string;
  results: Array<ResultItem> | SingleResult;
  isLoading: boolean;
  error?: boolean;
  hasError: boolean;
}

function App() {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [searchQuery, setSearchQuery] = useLocalStorage<string>('searchQuery');

  useEffect(() => {
    if (hasError) {
      throw new Error('There is an error');
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const trimmedValue = event.target.value.trim();
    setSearchQuery(trimmedValue);
  };

  const fetchData = async () => {
    setIsLoading(true);
    setHasError(false);

    try {
      let urlBase = `${BASE_URL}`;
      if (searchQuery) {
        urlBase += `/pokemon/${searchQuery}`;
      } else {
        urlBase += `/pokemon/?limit=10&offset=0`;
      }

      const response = await fetch(urlBase);
      const data = await response.json();

      let results = [];

      if (!searchQuery) {
        results = data.results || [];
      } else {
        results = data || [];
      }

      setResults(results);
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      setIsLoading(false);
      setHasError(true);
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    fetchData();
  };

  return (
    <div className="app">
      <div className="search-container">
        <SearchBar onChange={handleChange} searchQuery={searchQuery} />
        <SearchButton handleClick={handleClick} />
        <button
          className="errorButton"
          onClick={() => {
            setHasError(true);
          }}
        >
          Trigger Error
        </button>
      </div>

      {hasError ? (
        <div className="errorMessage">No results found</div>
      ) : isLoading ? (
        <div className="spinner-container">
          <Spinner />
        </div>
      ) : (
        <ResultsList results={results} searchQuery={searchQuery} />
      )}
    </div>
  );
}

export default App;

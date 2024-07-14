import './App.css';
import React, {
  PropsWithChildren,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import ResultsList, {
  ResultItem,
  SingleResult,
} from './components/ResultsList/ResultsList';
import { BASE_URL } from './constants';
import SearchButton from './components/SearchButton/SearchButton';
import Spinner from './components/Spinner/Spinner';
import useLocalStorage from './components/customHooks/useLocalStorage';
import SearchBar from './components/SearchBar/SearchBar';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

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
  const [error, setError] = useState({
    isError: false,
    errorMessage: '',
  });

  const [searchQuery, setSearchQuery] = useLocalStorage<string>(
    undefined,
    'searchQuery',
  );
  const [simulateError, setSimulateError] = useState(false);

  const throwError = () => {
    setSimulateError(true);
    throw new Error('Manual error');
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const trimmedValue = event.target.value.trim();
    setSearchQuery(trimmedValue);
  };

  const fetchData = async () => {
    setIsLoading(true);
    setError({ isError: false, errorMessage: '' });

    try {
      let urlBase = `${BASE_URL}`;
      if (searchQuery) {
        urlBase += `/pokemon/${searchQuery}`;
      } else {
        urlBase += `/pokemon/?limit=10&offset=0`;
      }

      const response = await fetch(urlBase);

      if (!response.ok) {
        if (response.status === 404) {
          setError({ isError: true, errorMessage: 'No results found' });
        } else {
          setError({ isError: true, errorMessage: 'An error occurred' });
        }
        return;
      }

      const data = await response.json();

      let results;

      if (!searchQuery) {
        results = data.results || [];
      } else {
        results = data || {};
      }

      setResults(results);
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      setIsLoading(false);
      setError({ isError: true, errorMessage: 'An error occurred' });
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    fetchData();
  };

  if (simulateError) {
    return <p>There is an error occured. Try to reload page.</p>;
  }

  return (
    <ErrorBoundary>
      <div className="app">
        <div className="search-container">
          <SearchBar handleChange={handleChange} searchQuery={searchQuery} />
          <SearchButton handleClick={handleClick} />
          <button className="errorButton" onClick={throwError}>
            Trigger Error
          </button>
        </div>

        {error.isError ? (
          <div className="errorMessage">No results found</div>
        ) : isLoading ? (
          <div className="spinner-container">
            <Spinner />
          </div>
        ) : (
          <ResultsList results={results} searchQuery={searchQuery} />
        )}
      </div>
    </ErrorBoundary>
  );
}

export default App;

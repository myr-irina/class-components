import './App.css';
import React, { useEffect, useState } from 'react';
import ResultsList from './components/ResultsList/ResultsList';
import { BASE_URL } from './constants';
import SearchButton from './components/SearchButton/SearchButton';
import Spinner from './components/Spinner/Spinner';
import useLocalStorage from './components/customHooks/useLocalStorage';
import SearchBar from './components/SearchBar/SearchBar';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

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

  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const throwError = () => {
    setSimulateError(true);
    throw new Error('Manual error');
  };

  useEffect(() => {
    if (!searchParams.has('page')) {
      setSearchParams({ ...searchParams, page: '1' });
    }

    const currentPage = parseInt(searchParams.get('page') ?? '1', 10);
    fetchData(currentPage);
  }, [searchParams]);

  const nextPage = () => {
    const nextPageNumber = parseInt(searchParams.get('page') ?? '1', 10) + 1;
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('page', String(nextPageNumber));

    navigate(`/?${newSearchParams.toString()}`, { replace: true });
  };

  const prevPage = () => {
    const prevPageNumber = parseInt(searchParams.get('page') ?? '1', 10) - 1;
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('page', prevPageNumber.toString());

    navigate(`/?${newSearchParams.toString()}`, { replace: true });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const trimmedValue = event.target.value.trim();
    setSearchQuery(trimmedValue);
  };

  const fetchData = async (page: number) => {
    setIsLoading(true);
    setError({ isError: false, errorMessage: '' });

    const limit = 10;
    const offset = (page - 1) * limit;

    try {
      let urlBase = `${BASE_URL}`;
      if (searchQuery) {
        urlBase += `/pokemon/${searchQuery}`;
      } else {
        urlBase += `/pokemon/?limit=${limit}&offset=${offset}`;
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

    const currentPage = parseInt(searchParams.get('page') ?? '1', 10);
    fetchData(currentPage);
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
          <ResultsList
            results={results}
            searchQuery={searchQuery}
            nextPage={nextPage}
            prevPage={prevPage}
          />
        )}
      </div>
    </ErrorBoundary>
  );
}

export default App;

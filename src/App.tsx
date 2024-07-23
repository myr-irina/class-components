import './App.css';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from './constants';
import SearchButton from './components/SearchButton/SearchButton';
import Spinner from './components/Spinner/Spinner';
import useLocalStorage from './components/customHooks/useLocalStorage';
import SearchBar from './components/SearchBar/SearchBar';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PaginationControls from './components/PaginationControls/PaginationControls';
import { ITEMS_PER_PAGE } from './constants';
import {
  useGetPokemonsQuery,
  useLazyGetSpecificPokemonsQuery,
} from './services/pokemon';
import PokemonList from './components/PokemonList/PokemonList';
import SearchResults from './components/SearchResults/SearchResults';
import useDebounce from './components/customHooks/useDebounce';

function App() {
  const { data, isLoading, isError } = useGetPokemonsQuery({
    limit: 10,
    offset: 0,
  });

  const [searchQuery, setSearchQuery] = useLocalStorage<string>(
    undefined,
    'searchQuery',
  );

  const debounced = useDebounce(searchQuery);

  useEffect(() => {
    console.log(searchQuery);
  }, [searchQuery]);

  const isSearchWithSearchquery = Boolean(debounced);

  const { data, isLoading, isError } = isSearchWithSearchquery
    ? useLazyGetSpecificPokemonsQuery(debounced)
    : useGetPokemonsQuery({ limit: 10, offset: 0 });

  const [simulateError, setSimulateError] = useState(false);

  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPages, setTotalPages] = useState(0);

  const throwError = () => {
    setSimulateError(true);
    throw new Error('Manual error');
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (!params.has('page')) {
      params.set('page', '1');
    }
    if (!params.has('details')) {
      params.set('details', '0');
    }

    navigate(`/?${params.toString()}`, { replace: true });

    const currentPage = parseInt(params.get('page') ?? '1', 10);
    fetchData(currentPage, setTotalPages);
  }, [searchParams]);

  const nextPage = () => {
    const nextPageNumber = parseInt(searchParams.get('page') ?? '1', 10) + 1;
    if (nextPageNumber > 0) {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.set('page', String(nextPageNumber));

      if (!newSearchParams.has('details')) {
        newSearchParams.set('details', '0');
      }

      navigate(`/?${newSearchParams.toString()}`, { replace: true });
    }
  };

  const prevPage = () => {
    const prevPageNumber = parseInt(searchParams.get('page') ?? '1', 10) - 1;
    if (prevPageNumber > 0) {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.set('page', prevPageNumber.toString());

      navigate(`/?${newSearchParams.toString()}`, { replace: true });
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const trimmedValue = event.target.value.trim();
    setSearchQuery(trimmedValue);
  };

  const fetchData = async (
    page: number,
    setPageCount: (count: number) => void,
  ) => {
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

      // if (!response.ok) {
      //   if (response.status === 404) {
      //     setError({ isError: true, errorMessage: 'No results found' });
      //   } else {
      //     setError({ isError: true, errorMessage: 'An error occurred' });
      //   }
      //   return;
      // }

      const data = await response.json();

      let results;

      if (!searchQuery) {
        results = data.results || [];
      } else {
        results = data || {};
      }

      const totalCount = data.count || 0;
      const pageCount = Math.ceil(totalCount / ITEMS_PER_PAGE);
      setPageCount(pageCount);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const currentPage = parseInt(searchParams.get('page') ?? '1', 10);
    fetchData(currentPage, (pageCount) => setTotalPages(pageCount));
  };
  if (isLoading) {
    <div className="spinner-container">
      <Spinner />
    </div>;
  }

  if (simulateError) {
    return <p>There is an error occured. Try to reload page.</p>;
  }

  const currentPage = parseInt(searchParams.get('page') ?? '1', 10);

  const isArrayResult = Array.isArray(data);

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

        {isArrayResult ? (
          <PokemonList
            results={data}
            searchQuery={searchQuery}
            nextPage={nextPage}
            prevPage={prevPage}
          />
        ) : (
          <SearchResults data={data} />
        )}

        <PaginationControls
          currentPage={currentPage}
          prevPage={prevPage}
          nextPage={nextPage}
          totalPages={totalPages}
          initialPagesToShow={5}
        />
      </div>
    </ErrorBoundary>
  );
}

export default App;

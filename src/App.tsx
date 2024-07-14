import './App.css';
import React, { PropsWithChildren, ReactNode, useState } from 'react';
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
  // constructor(props: PropsWithChildren<{ children?: ReactNode }>) {
  //   super(props);
  //   const storedSearchTerm = localStorage.getItem('searchTerm');
  //   this.state = {
  //     searchTerm: storedSearchTerm || '',
  //     results: [],
  //     isLoading: false,
  //     hasError: false,
  //   };
  // }

  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [searchQuery, setSearchQuery] = useLocalStorage<string>('searchQuery');

  // componentDidMount() {
  //   this.setState({ isLoading: true });

  //   const storedTerm = localStorage.getItem('searchTerm');

  //   if (storedTerm) {
  //     this.setState({ searchTerm: storedTerm || '' }, () => this.fetchData());
  //   } else {
  //     this.fetchData();
  //   }
  // }

  // componentDidUpdate() {
  //   if (this.state.error) throw new Error('This is an error');
  // }

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

      if (!this.state.searchTerm) {
        results = data.results || [];
      } else {
        results = data || [];
      }

      this.setState({ results, isLoading: false });
    } catch (error) {
      console.error('Failed to fetch data:', error);
      this.setState({ isLoading: false, hasError: true });
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
        <ResultsList results={results} />
      )}
    </div>
  );
}

export default App;

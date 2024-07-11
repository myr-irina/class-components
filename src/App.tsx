import './App.css';
import React, { PropsWithChildren, ReactNode } from 'react';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import SearchBar from './components/SearchBar/SearchBar';
import ResultsList, {
  ResultItem,
  SingleResult,
} from './components/ResultsList/ResultsList';
import { BASE_URL } from './constants';
import SearchButton from './components/SearchButton/SearchButton';
import Spinner from './components/Spinner/Spinner';

interface AppState {
  searchTerm: string;
  results: Array<ResultItem> | SingleResult;
  isLoading: boolean;
  hasError: boolean;
}

class App extends React.Component<{ children?: ReactNode }, AppState> {
  constructor(props: PropsWithChildren<{}>) {
    super(props);
    const storedSearchTerm = localStorage.getItem('searchTerm');
    this.state = {
      searchTerm: storedSearchTerm || '',
      results: [],
      isLoading: false,
      hasError: false,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    const storedTerm = localStorage.getItem('searchTerm');

    if (storedTerm) {
      this.setState({ searchTerm: storedTerm || '' }, () => this.fetchData());
    } else {
      this.fetchData();
    }
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    this.setState({ searchTerm: value }, () => {
      localStorage.setItem('searchTerm', value);
    });
  };

  fetchData = async () => {
    this.setState({ isLoading: true });
    this.setState({ hasError: false });

    try {
      let urlBase = `${BASE_URL}`;
      if (this.state.searchTerm) {
        urlBase += `/pokemon/${this.state.searchTerm}`;
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

      this.setState({ results: results, isLoading: false });
    } catch (error) {
      console.error('Failed to fetch data:', error);
      this.setState({ isLoading: false });
      this.setState({ hasError: true });
    }
  };

  handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const trimmedSearchTerm = this.state.searchTerm.trim();
    this.setState({ searchTerm: trimmedSearchTerm }, () => {
      localStorage.setItem('searchTerm', trimmedSearchTerm);
      this.fetchData();
    });
  };

  render() {
    return (
      <ErrorBoundary>
        <div className="app">
          <div className="search-container">
            <SearchBar
              onChange={this.handleChange}
              searchTerm={this.state.searchTerm}
            />
            <SearchButton onClick={this.handleClick} />
          </div>

          {this.state.hasError ? (
            <div className="errorMessage">No results found</div>
          ) : this.state.isLoading ? (
            <div className="spinner-container">
              <Spinner />
            </div>
          ) : (
            <ResultsList results={this.state.results} />
          )}
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;

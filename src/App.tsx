import './App.css';
import React, { PropsWithChildren, ReactNode } from 'react';
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
  error: boolean;
}

class App extends React.Component<
  PropsWithChildren<{ children?: ReactNode }>,
  AppState
> {
  constructor(props: PropsWithChildren<{ children?: ReactNode }>) {
    super(props);
    const storedSearchTerm = localStorage.getItem('searchTerm');
    this.state = {
      searchTerm: storedSearchTerm || '',
      results: [],
      isLoading: false,
      error: false,
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

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({ searchTerm: event.target.value }, () => {
      localStorage.setItem('searchTerm', event.target.value);
    });

  fetchData = async () => {
    this.setState({ isLoading: true });
    this.setState({ error: false });

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

      this.setState({ results, isLoading: false });
    } catch (error) {
      console.error('Failed to fetch data:', error);
      this.setState({ isLoading: false, error: true });
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

  handleClickError = () => {
    throw new Error('An error occurred!');
  };

  render() {
    return (
      <div className="app">
        <div className="search-container">
          <SearchBar
            onChange={this.handleChange}
            searchTerm={this.state.searchTerm}
          />
          <SearchButton onClick={this.handleClick} />
          <button className="errorButton" onClick={this.handleClickError}>
            Trigger Error
          </button>
        </div>

        {this.state.error ? (
          <div className="errorMessage">No results found</div>
        ) : this.state.isLoading ? (
          <div className="spinner-container">
            <Spinner />
          </div>
        ) : (
          <ResultsList results={this.state.results} />
        )}
      </div>
    );
  }
}

export default App;

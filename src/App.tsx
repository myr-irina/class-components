import './App.css';
import React from 'react';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import SearchBar from './components/SearchBar/SearchBar';
import ResultsList from './components/ResultsList/ResultsList';
import { BASE_URL } from './constants';
import SearchButton from './components/SearchButton/SearchButton';
import Spinner from './components/Spinner/Spinner';

interface AppState {
  searchTerm: string;
  results: Array<{ name: string; url: string }>;
  isLoading: boolean;
}

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      searchTerm: '',
      results: [],
      isLoading: false
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
    this.setState({isLoading: true})
    try {
  
      let urlBase = `${BASE_URL}/pokemon/?limit=10&offset=0`;
      if (this.state.searchTerm) {     
        urlBase += `&query=${encodeURIComponent(this.state.searchTerm)}`;
      }
  
      const response = await fetch(urlBase);
      const data = await response.json();
  
      this.setState({ results: data.results, isLoading: false });
    } catch (error) {
      console.error("Failed to fetch data:", error);
      this.setState({ isLoading: false }); 
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
          <div className='search-container'> <SearchBar onChange={this.handleChange} />
          <SearchButton onClick={this.handleClick}/></div>
         
      
          {this.state.isLoading ? (
         <div className="spinner-container">
         <Spinner />
       </div>
          ) : (
            <ResultsList results={this.state.results}/>
          )}
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
import React, { Component } from 'react';
import './style.scss';
interface ResultItem {
  name: string;
  url: string;
  abilities?: {
    ability: {
      name: string;
      url: string;
    };
  }[];
}

interface ResultsListProps {
  results: Array<ResultItem>;
}

class ResultsList extends React.Component<ResultsListProps> {
  render() {
    const { results } = this.props;

    const searchTerm = localStorage.getItem('searchTerm');

    if (!searchTerm) {
      return (
        <ul>
          {results.map((result, index) => (
            <li key={index}>
              {result.name} - {result.url}
            </li>
          ))}
        </ul>
      );
    } else {
      return (
        <>
          <p className="pokemon-name">{results?.name}</p>
          <ul>
            {results.abilities?.map((ability, index) => (
              <li key={index}>
                {ability.ability.name} - {ability.ability.url}
              </li>
            ))}
          </ul>
        </>
      );
    }
  }
}

export default ResultsList;

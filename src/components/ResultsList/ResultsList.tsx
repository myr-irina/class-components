import React, { Component } from 'react'

interface ResultsListProps {
  results: Array<{ name: string; url: string }>;
}

class ResultsList extends React.Component<ResultsListProps> {
  render() {
    return (
      <ul>
        {this.props.results.map((result, index) => (
          <li key={index}>
            {result.name} - {result.url}
          </li>
        ))}
      </ul>
    );
  }
}

export default ResultsList;
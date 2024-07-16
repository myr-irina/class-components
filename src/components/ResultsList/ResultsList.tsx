import React, { MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';

export interface ResultItem {
  name: string;
  url: string;
  abilities: {
    ability: {
      name: string;
      url: string;
    };
  }[];
}

export interface SingleResult {
  name: string;
  url?: string;
  abilities: {
    ability: {
      name: string;
      url: string;
    };
  }[];
}

interface ResultsListProps {
  results: Array<ResultItem> | SingleResult;
  searchQuery: string;
  nextPage: MouseEventHandler<HTMLButtonElement>;
  prevPage: MouseEventHandler<HTMLButtonElement>;
}

const ResultsList: React.FC<ResultsListProps> = ({ results }) => {
  const displayedResults = Array.isArray(results) ? results : [results];

  return (
    <>
      {Array.isArray(results) ? (
        <>
          <ul>
            {displayedResults.map((result, index) => (
              <li key={index}>
                {result.name} - {result.url}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <p className="pokemon-name">{displayedResults[0]?.name}</p>
          <ul>
            {displayedResults[0] &&
              displayedResults[0].abilities?.map((ability, idx) => (
                <li key={idx}>
                  <Link to="/search/1/3">
                    {ability.ability?.name} - {ability.ability?.url}
                  </Link>
                </li>
              ))}
          </ul>
        </>
      )}
    </>
  );
};

export default ResultsList;

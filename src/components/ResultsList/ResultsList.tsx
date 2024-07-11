import React, { useState } from 'react';

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
}

const ResultsList: React.FC<ResultsListProps> = ({ results }) => {
  const [searchTerm] = useState(localStorage.getItem('searchTerm'));

  const displayedResults = Array.isArray(results) ? results : [results];

  return (
    <>
      {!searchTerm ? (
        <ul>
          {displayedResults.map((result, index) => (
            <li key={index}>
              {result.name} - {result.url}
            </li>
          ))}
        </ul>
      ) : (
        <>
          <p className="pokemon-name">{displayedResults[0]?.name}</p>
          <ul>
            {displayedResults[0] &&
              displayedResults[0].abilities?.map((ability, idx) => (
                <li key={idx}>
                  {ability.ability?.name} - {ability.ability?.url}
                </li>
              ))}
          </ul>
        </>
      )}
    </>
  );
};

export default ResultsList;

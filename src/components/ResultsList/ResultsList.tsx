import React, { MouseEventHandler } from 'react';
import styles from './styles.module.scss';

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

const ResultsList: React.FC<ResultsListProps> = ({
  results,
  prevPage,
  nextPage,
}) => {
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

          <div className={styles.buttons}>
            <button onClick={prevPage}>Previous Page</button>
            <button onClick={nextPage}>Next Page</button>
          </div>
        </>
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

import React from 'react';
import { Link } from 'react-router-dom';

function SearchResults() {
  return (
    <>
      <h2 className="pokemon-name">Name: {displayedResults[0]?.name}</h2>
      <ul>
        {displayedResults[0] &&
          displayedResults[0].abilities?.map((ability, idx) => (
            <li key={idx}>
              <Link
                to={`/?details=${ability.ability?.url?.match(/\/(\d+)\/$/)?.[1]}`}
              >
                {ability.ability?.name} - {ability.ability?.url}
              </Link>
            </li>
          ))}
      </ul>
    </>
  );
}

export default SearchResults;

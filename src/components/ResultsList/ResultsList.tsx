import React, { MouseEventHandler } from 'react';
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import Details from '../Details/Details';

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
  const navigate = useNavigate();
  const location = useLocation();
  const displayedResults = Array.isArray(results) ? results : [results];

  const [searchParams] = useSearchParams();
  const detailsId = searchParams.get('details');

  const handlePokemonSelect = (pokemonId: string) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.delete('details');
    searchParams.append('details', pokemonId);

    navigate(`/?${searchParams.toString()}`, {
      replace: true,
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '20px',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginTop: '20px',
      }}
    >
      <div>
        {Array.isArray(results) ? (
          <ul>
            {displayedResults.map((result, index) => {
              const pokemonId = result.url?.match(/\/(\d+)\/$/)?.[1];

              return (
                <li key={index}>
                  <span
                    onClick={() => handlePokemonSelect(pokemonId as string)}
                    style={{ cursor: 'pointer' }}
                  >
                    {result.name} - {result.url}
                  </span>
                </li>
              );
            })}
          </ul>
        ) : (
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
        )}
      </div>

      {detailsId && (
        <div>
          <Details />
        </div>
      )}
    </div>
  );
};

export default ResultsList;

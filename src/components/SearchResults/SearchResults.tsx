import { Link } from 'react-router-dom';
import { IPokemonDetails } from '../../types';

function SearchResults({ data }: { data: IPokemonDetails }) {
  return (
    <>
      {data !== null && <h2 className="pokemon-name">Name: {data?.name}</h2>}

      <ul>
        {data &&
          data.abilities?.map((ability, idx) => (
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

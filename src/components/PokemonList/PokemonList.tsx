import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import Details from '../Details/Details';
import { IResult } from '../../types';

const PokemonList = ({ results }: { results: IResult[] }) => {
  console.log({ results });
  const navigate = useNavigate();
  const location = useLocation();

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
      <ul>
        {results.map((result, index) => {
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

      {detailsId && (
        <div>
          <Details />
        </div>
      )}
    </div>
  );
};

export default PokemonList;

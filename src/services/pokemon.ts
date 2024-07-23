import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IPokemonList, IResult } from '../types';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemons: builder.query<IResult[], { limit: number; offset: number }>({
      query: ({ limit, offset }) => ({
        url: `/pokemon/`,
        params: {
          limit: limit,
          offset: offset,
        },
      }),
      transformResponse: (response: IPokemonList) => response.results,
    }),

    getSpecificPokemons: builder.query<IResult[], string>({
      query: (searchTerm) => ({
        url: `/pokemon/${searchTerm}`,
      }),
    }),
  }),
});

export const { useGetPokemonsQuery, useLazyGetSpecificPokemonsQuery } =
  pokemonApi;

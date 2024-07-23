import { configureStore } from '@reduxjs/toolkit';
import { pokemonApi } from '../services/pokemon';
import pokemonSlice from './PokemonSlice';

export const store = configureStore({
  reducer: {
    pokemonSlice: pokemonSlice,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

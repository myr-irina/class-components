import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
// import rootReducer from './rootReducer';

import { pokemonApi } from '../services/pokemon';
import { setupListeners } from '@reduxjs/toolkit/query';

const store = configureStore({
  reducer: {
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export default store;

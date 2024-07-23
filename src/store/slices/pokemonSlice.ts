import { createSlice } from '@reduxjs/toolkit';
import { pokemonApi } from '../../services/pokemon';

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: {
    pokemonList: null,
  },
  reducers: {
    setSelectedPokemon: (state, action) => {
      state.pokemonList = action.payload;
    },
  },
});

export const { setSelectedPokemon } = pokemonSlice.actions;

export default pokemonSlice.reducer;

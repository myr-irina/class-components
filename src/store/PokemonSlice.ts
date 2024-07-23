import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const initialState = {
  data: null,
  isLoading: false,
  isError: false,
  searchQuery: '',
  totalPages: 0,
  currentPage: 1,
};

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setPokemonData: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.isError = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export const {
  setPokemonData,
  setLoading,
  setError,
  setSearchQuery,
  setTotalPages,
  setCurrentPage,
} = pokemonSlice.actions;

export default pokemonSlice.reducer;

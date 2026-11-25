import { createSlice } from '@reduxjs/toolkit';

// Redux Toolkit slice: all watchlist changes go through these reducers.
const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState: {
    items: [],
  },
  reducers: {
    addMovie(state, action) {
      const movie = action.payload;
      const alreadySaved = state.items.some(
        item => String(item.id) === String(movie.id)
      );
      if (!alreadySaved) state.items.push(movie);
    },
    removeMovie(state, action) {
      const movieId = action.payload;
      state.items = state.items.filter(
        item => String(item.id) !== String(movieId)
      );
    },
    toggleMovie(state, action) {
      const movie = action.payload;
      const alreadySaved = state.items.some(
        item => String(item.id) === String(movie.id)
      );
      if (alreadySaved) {
        state.items = state.items.filter(
          item => String(item.id) !== String(movie.id)
        );
      } else {
        state.items.push(movie);
      }
    },
    clearWatchlist(state) {
      state.items = [];
    },
  },
});

export const { addMovie, removeMovie, toggleMovie, clearWatchlist } = watchlistSlice.actions;
export default watchlistSlice.reducer;

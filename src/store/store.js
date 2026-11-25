import { configureStore } from '@reduxjs/toolkit';
import watchlistReducer from './watchlistSlice';

function loadSavedWatchlist() {
  try {
    const saved = JSON.parse(localStorage.getItem('flicksy-watchlist') || '[]');
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

export const store = configureStore({
  reducer: {
    watchlist: watchlistReducer,
  },
  preloadedState: {
    watchlist: { items: loadSavedWatchlist() },
  },
});

// Keep Redux as the source of truth, while preserving the existing browser storage.
store.subscribe(() => {
  try {
    localStorage.setItem(
      'flicksy-watchlist',
      JSON.stringify(store.getState().watchlist.items)
    );
  } catch {
    // The app can still work for this session if browser storage is unavailable.
  }
});

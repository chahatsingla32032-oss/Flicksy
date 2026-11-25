import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMovie } from '../store/watchlistSlice';
import { useApp } from '../context/AppContext';

// A small project hook keeps Redux details out of presentational components.
export function useWatchlist() {
  const watchlist = useSelector(state => state.watchlist.items);
  const dispatch = useDispatch();
  const { notify } = useApp();

  const toggleWatchlist = useCallback((movie) => {
    const exists = watchlist.some(item => String(item.id) === String(movie.id));
    dispatch(toggleMovie(movie));
    notify(exists ? 'Removed from your watchlist' : 'Added to your watchlist');
  }, [dispatch, notify, watchlist]);

  return { watchlist, toggleWatchlist };
}

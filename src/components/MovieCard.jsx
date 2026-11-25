import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, X, CalendarDays, Clock3 } from 'lucide-react';
import { useWatchlist } from '../hooks/useWatchlist';

const fallback = 'https://placehold.co/500x750/171923/f4f4f5?text=No+Poster';

function MovieDetailsModal({ movie, onClose, saved, onToggleWatchlist }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="movie-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="movie-modal" role="dialog" aria-modal="true" aria-labelledby="movie-modal-title">
        <button className="movie-modal-close" onClick={onClose} aria-label="Close movie details"><X size={21} /></button>
        <div className="movie-modal-layout">
          <img className="movie-modal-poster" src={movie.poster || fallback} alt={`${movie.title} poster`} onError={e => { e.currentTarget.src = fallback; }} />
          <div className="movie-modal-copy">
            <span className="section-kicker">FLICKSY FEATURE</span>
            <h2 id="movie-modal-title">{movie.title}</h2>
            <div className="movie-modal-meta">
              <span><Star size={15} fill="currentColor" /> {Number(movie.rating || 0).toFixed(1)} / 10</span>
              <span><CalendarDays size={15} /> {movie.year || 'Year unavailable'}</span>
              {movie.runtime && <span><Clock3 size={15} /> {movie.runtime}</span>}
            </div>
            {movie.genre && <span className="genre-pill">{movie.genre}</span>}
            <h3>About the movie</h3>
            <p>{movie.overview || 'No description is available for this movie yet.'}</p>
            <div className="hero-actions">
              <button className="button button-primary" onClick={() => onToggleWatchlist(movie)}>
                <Heart size={17} fill={saved ? 'currentColor' : 'none'} />
                {saved ? 'In your watchlist' : 'Add to watchlist'}
              </button>
              <Link className="button button-ghost" to={`/movies/${movie.id}`} onClick={onClose}>Full details</Link>
            </div>
            <p className="disclaimer">Flicksy is a movie discovery project. It does not stream or host films.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function MovieCard({ movie }) {
  const { watchlist, toggleWatchlist } = useWatchlist();
  const [showDetails, setShowDetails] = useState(false);
  const saved = watchlist.some(m => String(m.id) === String(movie.id));

  return (
    <>
      <article className="movie-card">
        <div className="poster-wrap">
          <Link to={`/movies/${movie.id}`} className="poster-link" aria-label={`View ${movie.title} full page`}>
            <img className="movie-poster" src={movie.poster || fallback} alt={`${movie.title} poster`} loading="lazy" onError={e => { e.currentTarget.src = fallback; }} />
          </Link>
          <button className={`save-button ${saved ? 'is-saved' : ''}`} onClick={() => toggleWatchlist(movie)} aria-label={saved ? 'Remove from watchlist' : 'Add to watchlist'} title={saved ? 'Remove from watchlist' : 'Add to watchlist'}>
            <Heart size={17} fill={saved ? 'currentColor' : 'none'} />
          </button>
        </div>
        <div className="movie-info">
          <Link to={`/movies/${movie.id}`} className="movie-title">{movie.title}</Link>
          <div className="movie-meta">
            <span>{movie.year}</span><span className="meta-dot">•</span><span>{movie.genre || 'Movie'}</span>
            <span className="rating"><Star size={13} fill="currentColor" />{Number(movie.rating || 0).toFixed(1)}</span>
          </div>
          <button type="button" className="button button-primary details-button" onClick={() => setShowDetails(true)}>View details</button>
        </div>
      </article>
      {showDetails && <MovieDetailsModal movie={movie} onClose={() => setShowDetails(false)} saved={saved} onToggleWatchlist={toggleWatchlist} />}
    </>
  );
}

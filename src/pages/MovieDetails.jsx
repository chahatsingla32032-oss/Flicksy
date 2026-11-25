import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Heart, Star, CalendarDays, Clock3, PlayCircle } from 'lucide-react';
import { movies } from '../data/movies';
import { useWatchlist } from '../hooks/useWatchlist';
import MovieCard from '../components/MovieCard';
import { getMovieDetails } from '../services/movieApi';
export default function MovieDetails(){
 const {id}=useParams();
 const localMovie=movies.find(m=>String(m.id)===id);
 const [externalMovie,setExternalMovie]=useState(null);
 const [loading,setLoading]=useState(false);
 const [error,setError]=useState('');
 const {watchlist,toggleWatchlist}=useWatchlist();
 useEffect(()=>{
  if(!id.startsWith('api-')){setExternalMovie(null);setError('');return}
  const controller=new AbortController();setLoading(true);setError('');
  getMovieDetails(id.slice(4),controller.signal).then(setExternalMovie).catch(err=>{if(err.name!=='AbortError')setError(err.message)}).finally(()=>{if(!controller.signal.aborted)setLoading(false)});
  return ()=>controller.abort();
 },[id]);
 const movie=localMovie||externalMovie;
 if(loading&&!movie)return <main className="wrap not-found"><h1>Loading movie details…</h1></main>;
 if(error&&!movie)return <main className="wrap not-found"><h1>Couldn't load this movie.</h1><p>{error}</p><Link className="button button-primary" to="/movies">Back to explore</Link></main>;
 if(!movie)return <main className="wrap not-found"><h1>We couldn't find that film.</h1><Link className="button button-primary" to="/movies">Back to explore</Link></main>;
 const saved=watchlist.some(m=>String(m.id)===String(movie.id));
 const similar=movies.filter(m=>m.genre===movie.genre&&String(m.id)!==String(movie.id)).slice(0,4);
 return <main><section className="detail-hero" style={{'--detail-image':`url(${movie.backdrop||movie.poster})`}}><div className="detail-shade"></div><div className="wrap detail-content"><Link className="back-link" to="/movies"><ArrowLeft size={16}/> Back to explore</Link><div className="detail-layout"><img className="detail-poster" src={movie.poster} alt={`${movie.title} poster`} onError={e=>{e.currentTarget.style.visibility='hidden'}}/><div className="detail-copy"><span className="section-kicker">FLICKSY FEATURE</span><h1>{movie.title}</h1><div className="detail-meta"><span><Star size={16} fill="currentColor"/> {Number(movie.rating).toFixed(1)} / 10</span><span><CalendarDays size={16}/> {movie.year}</span><span><Clock3 size={16}/> {movie.runtime||'Feature film'}</span></div><span className="genre-pill">{movie.genre}</span><h2>About the movie</h2><p>{movie.overview}</p><div className="hero-actions"><button className="button button-primary" onClick={()=>toggleWatchlist(movie)}><Heart size={17} fill={saved?'currentColor':'none'}/>{saved?'In your watchlist':'Add to watchlist'}</button><Link className="button button-ghost" to="/watchlist"><PlayCircle size={17}/> My watchlist</Link></div><p className="disclaimer">Flicksy is a movie discovery project. It does not stream or host films. Movie metadata provided by Cinemeta.</p></div></div></div></section>{similar.length>0&&<section className="section wrap"><div className="section-heading"><div><span className="section-kicker">MORE LIKE THIS</span><h2>Keep the <span>vibe going.</span></h2></div></div><div className="movie-grid">{similar.map(m=><MovieCard key={m.id} movie={m}/>)}</div></section>}</main>
}

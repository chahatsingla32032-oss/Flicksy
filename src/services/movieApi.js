// Keyless public movie metadata API (Cinemeta/Stremio catalog).
// No account, API key, or .env configuration is required.
const API_BASE = 'https://v3-cinemeta.strem.io';

function normalize(meta) {
  const release = meta.releaseInfo || meta.year || '';
  const yearMatch = String(release).match(/\d{4}/);
  const genres = Array.isArray(meta.genres) ? meta.genres : [];
  return {
    id: `api-${meta.imdb_id || meta.id}`,
    tmdbId: meta.imdb_id || meta.id,
    title: meta.name || meta.title || 'Untitled',
    year: yearMatch ? Number(yearMatch[0]) : '—',
    rating: Number(meta.imdbRating || meta.rating || 0),
    genre: genres[0] || 'Movie',
    genres,
    runtime: meta.runtime || '',
    poster: meta.poster || '',
    backdrop: meta.background || meta.poster || '',
    overview: meta.description || 'No overview available.',
  };
}

async function fetchJson(url, signal) {
  const response = await fetch(url, { signal, headers: { Accept: 'application/json' } });
  if (!response.ok) throw new Error(`Movie service returned ${response.status}. Please try again.`);
  return response.json();
}

export async function getPopularMovies(signal, page = 1) {
  // The public catalog provides a curated list. Page is accepted for compatibility.
  // Further pages are assembled by fetching the catalog's other public lists where available.
  const urls = page <= 1
    ? [`${API_BASE}/catalog/movie/top.json`]
    : [`${API_BASE}/catalog/movie/top/skip=${(page - 1) * 100}.json`];
  let lastError;
  for (const url of urls) {
    try {
      const data = await fetchJson(url, signal);
      const items = data.metas || data.results || [];
      if (items.length) return items.map(normalize);
    } catch (error) {
      if (error.name === 'AbortError') throw error;
      lastError = error;
    }
  }
  throw lastError || new Error('Could not load movies right now. Please try again.');
}

export async function searchMovies(query, signal) {
  const encoded = encodeURIComponent(query.trim());
  const urls = [
    `${API_BASE}/catalog/movie/top/search=${encoded}.json`,
  ];
  let lastError;
  for (const url of urls) {
    try {
      const data = await fetchJson(url, signal);
      const items = data.metas || data.results || [];
      if (items.length) return items.map(normalize);
    } catch (error) {
      if (error.name === 'AbortError') throw error;
      lastError = error;
    }
  }
  // Some public catalogs do not expose search. Fall back to searching the fetched catalog.
  const catalog = await getPopularMovies(signal);
  const matches = catalog.filter(movie => movie.title.toLowerCase().includes(query.trim().toLowerCase()));
  if (matches.length) return matches;
  if (lastError) throw lastError;
  return [];
}

export async function getMovieDetails(id, signal) {
  const data = await fetchJson(`${API_BASE}/meta/movie/${encodeURIComponent(id)}.json`, signal);
  const meta = data.meta || data;
  return normalize(meta);
}

import { Movie } from '../models/movie.model';
import { Game } from '../models/game.model';
import { HeroItem } from '../models/hero-item.model';

export function mapMovieToHero(movie: Movie): HeroItem {
  const backdrop = movie.backdrop_path 
    ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}` 
    : null;

  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w780${movie.poster_path}`
    : null;

  return {
    id: movie.id,
    title: movie.title,
    overview: movie.overview,
    releaseDate: movie.release_date,
    backdropUrl: backdrop || poster || 'assets/placeholder-hero.jpg',
    type: 'movie'
  };
}


export function mapGameToHero(game: Game): HeroItem {
  const img = game.artworks?.[0]?.url || game.screenshots?.[0]?.url || '';
  return {
    id: game.id,
    title: game.name,
    releaseDate: game.first_release_date
      ? new Date(game.first_release_date * 1000).toLocaleDateString('it-IT')
      : undefined,
    backdropUrl: img ? `https:${img.replace('t_thumb', 't_1080p')}` : 'assets/placeholder-hero.jpg',
    type: 'game'
  };
}

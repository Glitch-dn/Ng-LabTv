import { Movie } from './movie.model';

export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface Crew {
  id: number;
  name: string;
  job: string;
}

export interface MovieDetail extends Movie {
  genres: { id: number; name: string }[];
  runtime: number;
  vote_average: number;
  tagline: string;
  credits: {
    cast: Cast[];
    crew: Crew[];
  };
  similar: {
    results: Movie[];
  };
}

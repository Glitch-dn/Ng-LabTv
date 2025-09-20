export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path?: string | null; // 👈 aggiunto (opzionale)
  release_date: string;
  overview: string;
}

export interface DiscoverResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

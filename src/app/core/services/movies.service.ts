import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Movie, DiscoverResponse } from '../models/movie.model';
import { MovieDetail } from '../models/movie-detail.model';

@Injectable({ providedIn: 'root' })
export class MoviesService {
  private baseUrl = environment.tmdbBase; // "https://api.themoviedb.org/3"
  private apiKey = environment.tmdbApiKey;
  private lang = 'it-IT';

  constructor(private http: HttpClient) {console.log(this.apiKey);}

  /** Trending films of the day */
  getTrending(page = 1): Observable<Movie[]> {
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('language', this.lang)
      .set('page', page);

    return this.http
      .get<DiscoverResponse>(`${this.baseUrl}/trending/movie/day`, { params })
      .pipe(map(res => res.results));
  }

  /** Popular films */
  getPopular(page = 1): Observable<Movie[]> {
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('language', this.lang)
      .set('page', page);

    return this.http
      .get<DiscoverResponse>(`${this.baseUrl}/movie/popular`, { params })
      .pipe(map(res => res.results));
  }

  /** Top rated films */
  getTopRated(page = 1): Observable<Movie[]> {
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('language', this.lang)
      .set('page', page);

    return this.http
      .get<DiscoverResponse>(`${this.baseUrl}/movie/top_rated`, { params })
      .pipe(map(res => res.results));
  }

  /** Film detail with videos, cast and recommendations */
  getMovieDetails(id: number): Observable<MovieDetail> {
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('language', this.lang)
      .set('append_to_response', 'videos,credits,recommendations');

    return this.http.get<MovieDetail>(`${this.baseUrl}/movie/${id}`, { params });
  }

  /** Upcoming films */
  getUpcoming(page = 1): Observable<Movie[]> {
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('language', this.lang)
      .set('page', page);

    return this.http
      .get<DiscoverResponse>(`${this.baseUrl}/movie/upcoming`, { params })
      .pipe(map(res => res.results));
  }

  /** Films by genre */
  getByGenre(genreId: number, page = 1): Observable<Movie[]> {
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('language', this.lang)
      .set('with_genres', genreId)
      .set('page', page);

    return this.http
      .get<DiscoverResponse>(`${this.baseUrl}/discover/movie`, { params })
      .pipe(map(res => res.results));
  }

  /** Search film by query */
  searchMovies(query: string, page = 1): Observable<Movie[]> {
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('language', this.lang)
      .set('query', query)
      .set('page', page);

    return this.http
      .get<DiscoverResponse>(`${this.baseUrl}/search/movie`, { params })
      .pipe(map(res => res.results));
  }
}

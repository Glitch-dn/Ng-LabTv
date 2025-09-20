import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { YouTubeSearchResponse } from '../models/youtube-video.model';

@Injectable({ providedIn: 'root' })
export class YouTubeService {
  private http = inject(HttpClient);
  private apiKey = environment.youtubeApiKey;
  private baseUrl = 'https://www.googleapis.com/youtube/v3/search';

  /**
   * Cerca il trailer italiano per un film e restituisce il videoId
   * @param title titolo del film
   * @returns Observable<string | null> → videoId oppure null se non trovato
   */
  searchTrailerItalian(title: string): Observable<string | null> {
    const query = `${title} trailer italiano`;

    const params = new HttpParams()
      .set('key', this.apiKey)
      .set('part', 'snippet')
      .set('q', query)
      .set('type', 'video')
      .set('maxResults', '1')
      .set('regionCode', 'IT')
      .set('relevanceLanguage', 'it');

    return this.http.get<YouTubeSearchResponse>(this.baseUrl, { params }).pipe(
      map(res => {
        if (!res.items || res.items.length === 0) {
          return null;
        }
        return res.items[0].id.videoId || null;
      })
    );
  }
}

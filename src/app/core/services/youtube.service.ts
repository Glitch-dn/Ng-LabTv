import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class YoutubeService {
  private baseUrl = 'https://www.googleapis.com/youtube/v3/search';
  private apiKey = environment.youtubeApiKey;

  constructor(private http: HttpClient) {}

  searchTrailer(title: string): Observable<any> {
    return this.http.get(`${this.baseUrl}?part=snippet&maxResults=1&q=${encodeURIComponent(title + ' trailer')}&key=${this.apiKey}`);
  }

  /** Restituisce URL pronto per embed */
  buildEmbedUrl(videoId: string): string {
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&start=8`;
  }
}

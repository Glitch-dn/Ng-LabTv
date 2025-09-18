import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Profile {
  id?: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone?: string;
  address?: string;
  birthdate?: string;      
  password: string;
  avatar: string;
  privacy: boolean;
}

@Injectable({ providedIn: 'root' })
export class ProfilesService {
  private activeProfile$ = new BehaviorSubject<Profile | null>(null);
  private baseUrl = `${environment.apiBaseUrl}/profiles`;

  constructor(private http: HttpClient) {}

  list(): Observable<Profile[]> {
    return this.http.get<Profile[]>(this.baseUrl);
  }

  add(profile: Omit<Profile, 'id'>): Observable<Profile> {
    return this.http.post<Profile>(this.baseUrl, profile);
  }

  setActive(profile: Profile) {
    this.activeProfile$.next(profile);
  }

  getActive(): Observable<Profile | null> {
    return this.activeProfile$.asObservable();
  }
}

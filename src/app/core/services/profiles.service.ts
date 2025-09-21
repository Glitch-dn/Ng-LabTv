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
  active?: boolean; // 🔹 aggiunto per gestione profilo attivo
}

@Injectable({ providedIn: 'root' })
export class ProfilesService {
  private activeProfile$ = new BehaviorSubject<Profile | null>(null);
  private baseUrl = `${environment.apiBaseUrl}/profiles`;

  constructor(private http: HttpClient) {}

  // 🔹 elenco completo
  list(): Observable<Profile[]> {
    return this.http.get<Profile[]>(this.baseUrl);
  }

  // 🔹 aggiunta nuovo
  add(profile: Omit<Profile, 'id'>): Observable<Profile> {
    return this.http.post<Profile>(this.baseUrl, profile);
  }

  // 🔹 update profilo (PUT/PATCH verso json-server)
  updateProfile(profile: Profile): Observable<Profile> {
    if (!profile.id) throw new Error('Profile ID is required for update');
    return this.http.patch<Profile>(`${this.baseUrl}/${profile.id}`, profile);
  }

  // 🔹 set profilo attivo solo lato client
  setActive(profile: Profile) {
    this.activeProfile$.next(profile);
  }

  // 🔹 osservabile per profilo attivo
  getActive(): Observable<Profile | null> {
    return this.activeProfile$.asObservable();
  }
}

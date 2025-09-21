import { Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs/operators';
import { ThemeService } from '../../core/services/theme.service';
import { MoviesService } from '../../core/services/movies.service';
import { ProfilesService } from '../../core/services/profiles.service'; // nuovo import
import { Profile } from '../../core/services/profiles.service'; // nuovo import

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  scrollStrength = 0;
  searchOpen = false;
  burgerOpen = false;
  query = '';
  hideLinks = false;
  hideSearch = false;

  // 🔹 Profili
  profiles: Profile[] = [];
  activeProfile: Profile | null = null;
  profilesOpen = false;

  private router = inject(Router);
  public theme = inject(ThemeService);
  private moviesApi = inject(MoviesService);
  private profilesService = inject(ProfilesService);

  constructor() {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: any) => this.updateVisibility(e.urlAfterRedirects));

    // carico i profili
    this.loadProfiles();
  }

  private updateVisibility(url: string) {
    const hide = url.startsWith('/profiles') || url.startsWith('/profile-form');
    this.hideLinks = hide;
    this.hideSearch = hide;
    this.burgerOpen = false; // chiude burger al cambio rotta
  }

  @HostListener('window:scroll')
  onScroll() {
    const maxScroll = 300;
    const current = window.scrollY;
    this.scrollStrength = Math.min(current / maxScroll, 1);

    if (this.searchOpen) {
      this.searchOpen = false;
      this.query = '';
    }
    if (this.burgerOpen) {
      this.burgerOpen = false;
    }
  }

  toggleSearch() {
    this.searchOpen = !this.searchOpen;
    if (!this.searchOpen) this.query = '';
  }

  onSearch() {
    if (!this.query.trim()) return;
    this.moviesApi.searchMovies(this.query).subscribe(() => {
      this.router.navigate(['/search'], { queryParams: { q: this.query } });
    });
  }

  // 🔹 PROFILI
  private loadProfiles() {
    this.profilesService.list().subscribe((res) => {
      this.profiles = res;
      this.activeProfile = this.profiles.find(p => p.active) || this.profiles[0];
    });
  }

  selectProfile(profile: Profile) {
    if (this.activeProfile) this.activeProfile.active = false;
    profile.active = true;
    this.activeProfile = profile;
    this.profilesOpen = false;
    this.profilesService.updateProfile(profile).subscribe();
    this.router.navigate(['/home']);
  }

  toggleProfilesMenu() {
    this.profilesOpen = !this.profilesOpen;
  }

  avatarUrl(avatar: string) {
    return `assets/avatars/${avatar}.png`;
  }
}

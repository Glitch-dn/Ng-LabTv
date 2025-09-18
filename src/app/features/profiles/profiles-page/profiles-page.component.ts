import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProfilesService, Profile } from '../../../core/services/profiles.service';
import { HeaderComponent } from '../../../shared/header/header.component';

@Component({
  selector: 'app-profiles-page',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderComponent],
  templateUrl: './profiles-page.component.html',
  styleUrls: ['./profiles-page.component.scss']
})
export class ProfilesPageComponent implements OnInit {
  profiles: Profile[] = [];

  constructor(private api: ProfilesService, private router: Router) {}

  ngOnInit() {
    this.api.list().subscribe((p: Profile[]) => (this.profiles = p));
  }

  enter(p: Profile) {
    this.api.setActive(p);
    this.router.navigateByUrl('/'); // per ora home vuota
  }

  avatarUrl(key: string) {
    return 'assets/avatars/' + key + '.png';
  }
}


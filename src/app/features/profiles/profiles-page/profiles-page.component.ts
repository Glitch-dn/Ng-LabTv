import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProfilesService, Profile } from '../../../core/services/profiles.service';
import { HeaderComponent } from '../../../shared/header/header.component';
import { PosterBackgroundComponent } from "../../../shared/poster-background/poster-background.component";

@Component({
  selector: 'app-profiles-page',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderComponent, PosterBackgroundComponent],
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
    console.log('Click su profilo', p); // 👈 debug
    this.api.setActive(p);
    this.router.navigateByUrl('/home');
  }
  

  avatarUrl(key: string) {
    return 'assets/avatars/' + key + '.png';
  }
}


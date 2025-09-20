import { Routes } from '@angular/router';
import { ProfilesPageComponent } from './features/profiles/profiles-page/profiles-page.component';
import { ProfileFormComponent } from './features/profiles/profile-form/profile-form.component';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: 'profiles', pathMatch: 'full' },
  { path: 'profiles', component: ProfilesPageComponent },
  { path: 'profiles/new', component: ProfileFormComponent },
  { path: 'home', component: HomeComponent },
  { path: '**', redirectTo: 'profiles' }
];

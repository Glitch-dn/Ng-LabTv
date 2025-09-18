import { Routes } from '@angular/router';

// ✅ nuovi percorsi corretti (cartelle generate dalla CLI)
import { ProfilesPageComponent } from './features/profiles/profiles-page/profiles-page.component';
import { ProfileFormComponent } from './features/profiles/profile-form/profile-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'profiles', pathMatch: 'full' },
  { path: 'profiles', component: ProfilesPageComponent },
  { path: 'profiles/new', component: ProfileFormComponent },
  { path: '**', redirectTo: 'profiles' }
];

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
  FormGroup
} from '@angular/forms';
import { Router } from '@angular/router';
import { ProfilesService, Profile } from '../../../core/services/profiles.service';
import { HeaderComponent } from '../../../shared/header/header.component';
import { PosterBackgroundComponent } from "../../../shared/poster-background/poster-background.component";

@Component({
  selector: 'app-profile-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent, PosterBackgroundComponent],
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements OnInit {

  form!: FormGroup;

  avatars = ['profile1', 'profile2', 'profile3', 'profile4', 'profile5', 'profile6'];

  constructor(
    private fb: FormBuilder,
    private api: ProfilesService,
    private router: Router
  ) {
    this.form = this.fb.group(
      {
      // Nome obbligatorio, solo lettere e spazi consentiti
      firstName: ['', [Validators.required, Validators.pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/)]],
      // Cognome obbligatorio, solo lettere e spazi consentiti
      lastName:  ['', [Validators.required, Validators.pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/)]],
      // Username obbligatorio, solo lettere e numeri, lunghezza tra 3 e 20 caratteri
      username:  ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{3,20}$/)]],
      // Email obbligatoria, deve essere un'email valida
      email:     ['', [Validators.required, Validators.email]],
      // Telefono obbligatorio, deve essere un numero di cellulare italiano valido
      phone:     ['', [Validators.required, Validators.pattern(/^(\+39)?\s?3\d{2}\s?\d{6,7}$/)]],
      // Indirizzo obbligatorio
      address:   ['', Validators.required],
      // Data di nascita obbligatoria
      birthdate: ['', Validators.required],
      // Password obbligatoria, almeno 8 caratteri, una maiuscola, una minuscola e un numero
      password:  ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)]],
      // Conferma password obbligatoria
      confirmPassword: ['', Validators.required],
      // Avatar obbligatorio, valore predefinito 'profile1'
      avatar:    ['profile1', Validators.required],
      // Privacy obbligatoria, deve essere accettata (true)
      privacy:   [false, Validators.requiredTrue]
      },
      // Validatore personalizzato per verificare che password e conferma corrispondano
      { validators: this.passwordMatchValidator }
    );
  }

  ngOnInit() {}

  private passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirm  = group.get('confirmPassword')?.value;
    return password === confirm ? null : { passwordMismatch: true };
  }

  submit() {
    if (this.form.invalid) return;

    // NON inviamo confirmPassword
    const { confirmPassword, ...rest } = this.form.value as Omit<Profile, 'id'> & { confirmPassword?: string };

    this.api.add(rest as Omit<Profile, 'id'>).subscribe(() => {
      this.router.navigateByUrl('/profiles');
    });
  }
}

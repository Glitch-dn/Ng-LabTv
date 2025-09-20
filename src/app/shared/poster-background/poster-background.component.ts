import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../core/services/theme.service'; // 👈 importa il tuo ThemeService
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-poster-background',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  templateUrl: './poster-background.component.html',
  styleUrls: ['./poster-background.component.scss']
})
export class PosterBackgroundComponent {
  private theme = inject(ThemeService);

  /** immagine usata in dark mode */
  @Input() darkSrc = '';

  /** immagine usata in light mode */
  @Input() lightSrc = '';

  // osservabile per il tema
  isDarkMode$ = this.theme.isDarkMode$;
}

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroItem } from '../../core/models/hero-item.model';
import { YouTubeService } from '../../core/services/youtube.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-hero-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-banner.component.html',
  styleUrls: ['./hero-banner.component.scss']
})
export class HeroBannerComponent {
  @Input() item: HeroItem | null = null;

  playing = false;
  videoUrl: SafeResourceUrl | null = null;

  constructor(
    private youtube: YouTubeService,
    private sanitizer: DomSanitizer
  ) {}

  get backgroundImage(): string {
    if (!this.item) return 'url("assets/placeholder-hero.jpg")';
    return `url('${this.item.backdropUrl}')`;
  }

  get hasOverview(): boolean {
    return !!this.item?.overview;
  }

  toggleTrailer() {
    if (!this.item) return;

    const title = this.item.title;

    if (this.playing) {
      // Stop trailer
      this.playing = false;
      this.videoUrl = null;
    } else {
      // Play trailer
      this.youtube.searchTrailerItalian(title).subscribe(videoId => {
        if (videoId) {
          const url = `https://www.youtube.com/embed/${videoId}?autoplay=1&start=8&rel=0&modestbranding=1&controls=0&showinfo=0`;
          this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
          this.playing = true;
        } else {
          console.warn('Trailer non trovato per', title);
        }
      });
    }
  }
}

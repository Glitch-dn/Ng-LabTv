import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesService } from '../../core/services/movies.service';
import { Movie } from '../../core/models/movie.model';
import { HeroItem } from '../../core/models/hero-item.model';
import { HeaderComponent } from '../../shared/header/header.component';
import { HeroBannerComponent } from "../../shared/hero-banner/hero-banner.component";
import { mapMovieToHero } from '../../core/utils/hero-mapper';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, HeroBannerComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private moviesApi = inject(MoviesService);

  trending: Movie[] = [];
  popular: Movie[] = [];
  topRated: Movie[] = [];
  upcoming: Movie[] = [];

  // 👇 aggiunta proprietà per Hero
  heroMovie: HeroItem | null = null;

  ngOnInit() {
    this.moviesApi.getTrending().subscribe(m => {
      this.trending = m;
  
      console.log('Trending ricevuti:', m);
  
      const firstWithBackdrop = m.find(movie => !!movie.backdrop_path);
      console.log('Film scelto per Hero:', firstWithBackdrop);
  
      if (firstWithBackdrop) {
        this.heroMovie = mapMovieToHero(firstWithBackdrop);
      }
    });
  
    this.moviesApi.getPopular().subscribe(m => this.popular = m);
    this.moviesApi.getTopRated().subscribe(m => this.topRated = m);
    this.moviesApi.getUpcoming().subscribe(m => this.upcoming = m);
  }
  
}

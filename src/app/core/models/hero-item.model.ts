export interface HeroItem {
    id: number;
    title: string;
    overview?: string;     // solo per film
    releaseDate?: string;  // dd/mm/yyyy convertito
    backdropUrl: string;   // immagine hero widescreen
    type: 'movie' | 'game';
  }
  
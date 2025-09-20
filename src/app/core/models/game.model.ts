export interface Game {
    id: number;
    name: string;
    first_release_date?: number; // timestamp UNIX
    artworks?: { id: number; url: string }[];
    screenshots?: { id: number; url: string }[];
  }
  
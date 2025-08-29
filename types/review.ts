export interface Review {
  id: string;
  title: string;
  image?: string;
  pageCount?: number;
  author?: string;
  rating?: 0 | 1 | 2 | 3 | 4 | 5;
  review?: string;
  quotes?: string[];
  favCharacter?: string;
  startDate?: string;
  endDate?: string;
  genre?: string;
  recommend?: boolean;
}

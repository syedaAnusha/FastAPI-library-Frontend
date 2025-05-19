export interface Book {
  id: number;
  title: string;
  author: string;
  published_year: number;
}

export interface BookCreate {
  title: string;
  author: string;
  published_year: number;
}

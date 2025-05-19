export interface Book {
  id: number;
  title: string;
  author: string;
  published_year: number;
  category: string;
  description: string;
  coverImage: string;
}

export type BookCreate = Omit<Book, "id">;

export interface CategoryResponse {
  books: Book[];
  total: number;
}

// Categories
export const categories = [
  "Fiction",
  "Non-Fiction",
  "Science Fiction",
  "Fantasy",
  "Biography",
  "History",
  "Self-Help",
  "Business",
  "Technology",
  "Other",
];
export interface Book {
  id: number;
  title: string;
  author: string;
  published_year: number;
  category: string;
  description: string;
  cover_image: string;
}

export type BookCreate = Omit<Book, "id">;

export interface CategoryResponse {
  books: Book[];
  total: number;
}

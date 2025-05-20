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

export interface SearchParams {
  title?: string;
  author?: string;
  year?: number;
}

export interface BookState {
  books: Book[];
  isLoading: boolean;
  error: string | null;
  totalBooks: number;
  searchTerm: string;
  currentCategory: string;
  currentSort: {
    field: "title" | "author" | "year";
    desc: boolean;
  };
  selectedBook: Book | null;
  isAddDialogOpen: boolean;
  isEditDialogOpen: boolean;
  isDeleteDialogOpen: boolean;

  // Actions
  setSearchTerm: (term: string) => void;
  setCurrentCategory: (category: string) => void;
  setSelectedBook: (book: Book | null) => void;
  setIsAddDialogOpen: (isOpen: boolean) => void;
  setIsEditDialogOpen: (isOpen: boolean) => void;
  setIsDeleteDialogOpen: (isOpen: boolean) => void;

  // Async Actions
  loadBooks: () => Promise<void>;
  deleteBook: (id: number) => Promise<void>;
  createBook: (book: BookCreate) => Promise<void>;
  updateBook: (id: number, book: BookCreate) => Promise<void>;
  sortBooks: (
    sortBy: "year" | "author" | "title",
    desc?: boolean
  ) => Promise<void>;
  filterByCategory: (category: string) => Promise<void>;
  searchBooks: (params: SearchParams) => void;

  // UI Actions
  handleSearch: (value: string) => void;
  handleCategoryChange: (category: string) => void;
  handleSort: (field: "title" | "author" | "year") => void;
  handleAddBook: () => void;
  handleEditBook: (book: Book) => void;
  handleConfirmDelete: (id: number) => void;
}

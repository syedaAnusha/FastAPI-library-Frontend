import { useState, useCallback } from "react";
import { Book, BookCreate } from "../types/types";
import { api } from "../utils/api";

interface UseBooksProps {
  books: Book[];
  isLoading: boolean;
  error: string | null;
  totalBooks: number;
  loadBooks: () => Promise<void>;
  deleteBook: (id: number) => Promise<void>;
  createBook: (book: BookCreate) => Promise<void>;
  updateBook: (id: number, book: BookCreate) => Promise<void>;
  sortBooks: (
    sortBy: "year" | "author" | "title",
    desc?: boolean
  ) => Promise<void>;
  filterByCategory: (category: string) => Promise<void>;
  searchBooks: (params: {
    title?: string;
    author?: string;
    year?: number;
  }) => Promise<void>;
}

export const useBooks = (): UseBooksProps => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalBooks, setTotalBooks] = useState<number>(0);

  const loadBooks = useCallback(async (): Promise<void> => {
    try {
      const data = await api.getAllBooks();
      setBooks(data);
      setTotalBooks(data.length);
      setError(null);
    } catch (e) {
      console.error("Error loading books:", e);
      setError("Failed to load books");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteBook = useCallback(async (id: number): Promise<void> => {
    try {
      await api.deleteBook(id);
      setBooks((prevBooks) => {
        const newBooks = prevBooks.filter((book) => book.id !== id);
        setTotalBooks(newBooks.length);
        return newBooks;
      });
      setError(null);
    } catch (e) {
      console.error("Error deleting book:", e);
      setError("Failed to delete book");
      throw e;
    }
  }, []);

  const createBook = useCallback(async (book: BookCreate): Promise<void> => {
    try {
      const newBook = await api.createBook(book);
      setBooks((prevBooks) => [...prevBooks, newBook]);
      setTotalBooks((prev) => prev + 1);
      setError(null);
    } catch (e) {
      console.error("Error creating book:", e);
      setError("Failed to create book");
      throw e;
    }
  }, []);

  const updateBook = useCallback(
    async (id: number, book: BookCreate): Promise<void> => {
      try {
        const updatedBook = await api.updateBook(id, book);
        setBooks((prevBooks) =>
          prevBooks.map((b) => (b.id === id ? updatedBook : b))
        );
        setError(null);
      } catch (e) {
        console.error("Error updating book:", e);
        setError("Failed to update book");
        throw e;
      }
    },
    []
  );

  const sortBooks = useCallback(
    async (
      sortBy: "year" | "author" | "title",
      desc: boolean = false
    ): Promise<void> => {
      try {
        setIsLoading(true);
        const sortedBooks = await api.getSortedBooks(sortBy, desc);
        setBooks(sortedBooks);
        setTotalBooks(sortedBooks.length);
        setError(null);
      } catch (e) {
        console.error("Error sorting books:", e);
        setError("Failed to sort books");
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const filterByCategory = useCallback(
    async (category: string): Promise<void> => {
      try {
        setIsLoading(true);
        const response = await api.getBooksByCategory(category);
        setBooks(response.books);
        setTotalBooks(response.total);
        setError(null);
      } catch (e) {
        console.error("Error filtering books:", e);
        setError("Failed to filter books");
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const searchBooks = useCallback(
    async (params: {
      title?: string;
      author?: string;
      year?: number;
    }): Promise<void> => {
      try {
        setIsLoading(true);
        const searchResults = await api.searchBooks(params);
        setBooks(searchResults);
        setTotalBooks(searchResults.length);
        setError(null);
      } catch (e) {
        console.error("Error searching books:", e);
        setError("Failed to search books");
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    books,
    isLoading,
    error,
    totalBooks,
    loadBooks,
    deleteBook,
    createBook,
    updateBook,
    sortBooks,
    filterByCategory,
    searchBooks,
  };
};

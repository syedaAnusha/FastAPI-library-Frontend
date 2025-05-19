import { useState, useCallback } from "react";
import { Book } from "../types/types";
import { api } from "../utils/api";

interface UseBooksProps {
  books: Book[];
  isLoading: boolean;
  error: string | null;
  loadBooks: () => Promise<void>;
  deleteBook: (id: number) => Promise<void>;
}

export const useBooks = (): UseBooksProps => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadBooks = useCallback(async (): Promise<void> => {
    try {
      const data = await api.getAllBooks();
      setBooks(data);
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
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
      setError(null);
    } catch (e) {
      console.error("Error deleting book:", e);
      setError("Failed to delete book");
      throw e;
    }
  }, []);

  return {
    books,
    isLoading,
    error,
    loadBooks,
    deleteBook,
  };
};

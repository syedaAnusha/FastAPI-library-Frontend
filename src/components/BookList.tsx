// components/BookList.tsx
import { useEffect } from "react";
import type { FC } from "react";
import { useBooks } from "../hooks/useBooks";
import BookCard from "./BookCard";

export const BookList: FC = () => {
  const { books, isLoading, error, loadBooks, deleteBook } = useBooks();

  useEffect(() => {
    loadBooks();
  }, [loadBooks]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 border border-red-300 bg-red-50 rounded text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Library Books</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {books.map((book) => (
          <BookCard key={book.id} book={book} onDelete={deleteBook} />
        ))}
      </div>
    </div>
  );
};

export default BookList;

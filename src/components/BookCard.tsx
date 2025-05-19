import { FC, memo } from "react";
import { Book } from "../types/types";

interface BookCardProps {
  book: Book;
  onDelete: (id: number) => Promise<void>;
}

export const BookCard: FC<BookCardProps> = memo(({ book, onDelete }) => {
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await onDelete(book.id);
      } catch (error: unknown) {
        console.log("Error deleting book:", error);
        // Error is handled by the parent component
      }
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <h3 className="text-xl font-semibold">{book.title}</h3>
      <p className="text-gray-600">by {book.author}</p>
      <p className="text-gray-500">Published: {book.published_year}</p>
      <div className="mt-4 space-x-2">
        <button
          onClick={handleDelete}
          className="px-3 py-1 text-sm text-red-600 border border-red-600 rounded hover:bg-red-50"
        >
          Delete
        </button>
      </div>
    </div>
  );
});

BookCard.displayName = "BookCard";

export default BookCard;

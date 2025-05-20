import { FC, memo } from "react";
import { Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Book } from "../types/types";

interface BookCardProps {
  book: Book;
  onEdit: (book: Book) => void;
  onDelete: (id: number) => Promise<void>;
}

export const BookCard: FC<BookCardProps> = memo(
  ({ book, onEdit, onDelete }) => {
    const handleDelete = async () => {
      try {
        await onDelete(book.id);
      } catch (error: unknown) {
        console.log("Error deleting book:", error);
        // Error is handled by the parent component
      }
    };

    return (
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div
          className={`h-48 ${
            !book.cover_image ? "bg-purple-600" : ""
          } flex items-center justify-center relative`}
        >
          {book.cover_image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={book.cover_image}
              alt={`Cover of ${book.title}`}
              className="w-full h-full object-cover"
            />
          ) : null}
          <h3
            className={`text-white text-xl font-bold px-4 text-center ${
              book.cover_image ? "hidden" : ""
            }`}
          >
            {book.title}
          </h3>
        </div>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-semibold text-lg">{book.title}</h4>
              <p className="text-gray-500 dark:text-gray-400">{book.author}</p>
            </div>
            <Badge variant="outline">{book.published_year}</Badge>
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <Badge className="mb-2" variant="secondary">
            {book.category}
          </Badge>
          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3">
            {book.description || "No description available."}
          </p>
        </CardContent>
        <CardFooter className="flex justify-between pt-2">
          <Button variant="outline" size="sm" onClick={() => onEdit(book)}>
            <Edit2 className="h-4 w-4 mr-1" /> Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4 mr-1" /> Delete
          </Button>
        </CardFooter>
      </Card>
    );
  }
);

BookCard.displayName = "BookCard";

export default BookCard;

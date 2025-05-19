// components/BookForm.tsx
import { FC, memo } from "react";
import { useBookForm } from "../hooks/useBookForm";
import FormInput from "./FormInput";

interface BookFormProps {
  onBookCreated: () => void;
}

export const BookForm: FC<BookFormProps> = memo(({ onBookCreated }) => {
  const { formData, error, handleInputChange, handleSubmit } =
    useBookForm(onBookCreated);

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <FormInput
        id="title"
        name="title"
        label="Title"
        value={formData.title}
        onChange={handleInputChange}
        required
      />

      <FormInput
        id="author"
        name="author"
        label="Author"
        value={formData.author}
        onChange={handleInputChange}
        required
      />

      <FormInput
        id="published_year"
        name="published_year"
        type="number"
        label="Published Year"
        value={formData.published_year}
        onChange={handleInputChange}
        required
        min={1000}
        max={new Date().getFullYear()}
      />

      {error && (
        <div className="p-2 border border-red-300 bg-red-50 rounded text-red-500 text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Add Book
      </button>
    </form>
  );
});

BookForm.displayName = "BookForm";

export default BookForm;

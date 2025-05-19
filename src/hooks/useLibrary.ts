import { useState, useCallback, useEffect } from "react";
import { Book, BookCreate } from "../types/types";
import { useBooks } from "./useBooks";

export const useLibrary = () => {
  const {
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
  } = useBooks();

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentCategory, setCurrentCategory] = useState("All");
  const [currentSort, setCurrentSort] = useState<{
    field: "title" | "author" | "year";
    desc: boolean;
  }>({ field: "title", desc: false });

  useEffect(() => {
    loadBooks();
  }, [loadBooks]);

  const handleSearch = useCallback(
    (value: string) => {
      setSearchTerm(value);
      if (value) {
        searchBooks({ title: value });
      } else {
        loadBooks();
      }
    },
    [searchBooks, loadBooks]
  );

  const handleCategoryChange = useCallback(
    (category: string) => {
      setCurrentCategory(category);
      if (category === "All") {
        loadBooks();
      } else {
        filterByCategory(category);
      }
    },
    [filterByCategory, loadBooks]
  );

  const handleSort = useCallback(
    (field: "title" | "author" | "year") => {
      setCurrentSort((prev) => {
        const desc = prev.field === field ? !prev.desc : false;
        sortBooks(field, desc);
        return { field, desc };
      });
    },
    [sortBooks]
  );

  const handleCreateBook = async (formData: FormData) => {
    const newBook: BookCreate = {
      title: formData.get("title") as string,
      author: formData.get("author") as string,
      published_year: parseInt(formData.get("publishedYear") as string),
      category: formData.get("category") as string,
      description: formData.get("description") as string,
      coverImage: "",
    };
    await createBook(newBook);
    setIsAddDialogOpen(false);
  };

  const handleUpdateBook = async (formData: FormData) => {
    if (!selectedBook) return;
    const updatedBook: BookCreate = {
      title: formData.get("title") as string,
      author: formData.get("author") as string,
      published_year: parseInt(formData.get("publishedYear") as string),
      category: formData.get("category") as string,
      description: formData.get("description") as string,
      coverImage: selectedBook.coverImage || "",
    };
    await updateBook(selectedBook.id, updatedBook);
    setIsEditDialogOpen(false);
  };

  const handleDeleteBook = async () => {
    if (!selectedBook) return;
    await deleteBook(selectedBook.id);
    setIsDeleteDialogOpen(false);
  };

  const handleAddBook = () => setIsAddDialogOpen(true);
  const handleEditBook = (book: Book) => {
    setSelectedBook(book);
    setIsEditDialogOpen(true);
  };

  return {
    // State
    books,
    isLoading,
    error,
    totalBooks,
    searchTerm,
    currentCategory,
    currentSort,
    selectedBook,
    isAddDialogOpen,
    isEditDialogOpen,
    isDeleteDialogOpen,

    // Actions
    setIsAddDialogOpen,
    setIsEditDialogOpen,
    setIsDeleteDialogOpen,
    handleSearch,
    handleCategoryChange,
    handleSort,
    handleAddBook,
    handleEditBook,
    handleCreateBook,
    handleUpdateBook,
    handleDeleteBook,
    deleteBook,
  };
};

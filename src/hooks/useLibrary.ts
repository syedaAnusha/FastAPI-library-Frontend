import { useEffect } from "react";
import { BookCreate } from "../types/types";
import { useBookStore } from "../store/useBookStore";
import { toast } from "sonner";

export const useLibrary = () => {
  const store = useBookStore();
  const loadBooks = store.loadBooks;
  useEffect(() => {
    loadBooks();
  }, [loadBooks]);

  const handleCreateBook = async (formData: FormData) => {
    const newBook: BookCreate = {
      title: formData.get("title") as string,
      author: formData.get("author") as string,
      published_year: parseInt(formData.get("published_year") as string),
      category: formData.get("category") as string,
      description: formData.get("description") as string,
      cover_image: (formData.get("cover_image") as string) || "",
    };
    try {
      await store.createBook(newBook);
      toast.success("Book created successfully!");
    } catch {
      toast.error("Failed to create book");
    }
  };

  const handleUpdateBook = async (formData: FormData) => {
    if (!store.selectedBook) return;
    const updatedBook: BookCreate = {
      title: formData.get("title") as string,
      author: formData.get("author") as string,
      published_year: parseInt(formData.get("published_year") as string),
      category: formData.get("category") as string,
      description: formData.get("description") as string,
      cover_image: (formData.get("cover_image") as string) || "",
    };
    try {
      await store.updateBook(store.selectedBook.id, updatedBook);
      toast.success("Book updated successfully!");
    } catch {
      toast.error("Failed to update book");
    }
  };
  const handleDeleteBook = async (id?: number) => {
    // If id is provided, use it directly (from BookCard delete button)
    // Otherwise use selectedBook.id (from DeleteDialog confirm button)
    const bookId = id || store.selectedBook?.id;
    if (!bookId) return;

    try {
      await store.deleteBook(bookId);
      store.setIsDeleteDialogOpen(false);
      toast.success("Book deleted successfully!");
    } catch {
      toast.error("Failed to delete book");
    }
  };

  return {
    // State
    books: store.books,
    isLoading: store.isLoading,
    error: store.error,
    totalBooks: store.totalBooks,
    currentPage: store.currentPage,
    pageSize: store.pageSize,
    searchTerm: store.searchTerm,
    currentCategory: store.currentCategory,
    currentSort: store.currentSort,
    selectedBook: store.selectedBook,
    isAddDialogOpen: store.isAddDialogOpen,
    isEditDialogOpen: store.isEditDialogOpen,
    isDeleteDialogOpen: store.isDeleteDialogOpen,

    // Actions
    setIsAddDialogOpen: store.setIsAddDialogOpen,
    setIsEditDialogOpen: store.setIsEditDialogOpen,
    setIsDeleteDialogOpen: store.setIsDeleteDialogOpen,
    handleSearch: store.handleSearch,
    handleCategoryChange: store.handleCategoryChange,
    handleSort: store.handleSort,
    handleAddBook: store.handleAddBook,
    handleEditBook: store.handleEditBook,
    handleCreateBook,
    handleUpdateBook,
    handleDeleteBook,
    handleConfirmDelete: store.handleConfirmDelete,
    deleteBook: store.deleteBook,
    setPage: store.setPage,
  };
};

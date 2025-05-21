import { useEffect } from "react";
import { BookCreate } from "../types/types";
import { useBookStore } from "../store/useBookStore";

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
    await store.createBook(newBook);
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
    await store.updateBook(store.selectedBook.id, updatedBook);
  };

  const handleDeleteBook = async () => {
    if (!store.selectedBook) return;
    await store.deleteBook(store.selectedBook.id);
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

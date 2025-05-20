"use client";

import { Header } from "@/components/Header";
import { Filters } from "@/components/Filters";
import BookCard from "@/components/BookCard";
import { BookDialog } from "@/components/BookDialog";
import { DeleteDialog } from "@/components/DeleteDialog";
import Layout from "../components/Layout";
import { useLibrary } from "@/hooks/useLibrary";

// Categories
const categories = [
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

export default function Home() {
  const {
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
    handleConfirmDelete,
  } = useLibrary();
  if (error) {
    return <div className="text-center text-red-600 mt-8">{error}</div>;
  }

  return (
    <Layout>
      <Header
        searchTerm={searchTerm}
        onSearch={handleSearch}
        onAddBook={handleAddBook}
      />
      <main className="container mx-auto px-4 py-8">
        <Filters
          currentCategory={currentCategory}
          currentSort={currentSort}
          totalBooks={totalBooks}
          onCategoryChange={handleCategoryChange}
          onSortChange={handleSort}
          categories={categories}
        />

        {isLoading ? (
          <div className="text-center py-8">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {books.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onEdit={handleEditBook}
                onDelete={handleConfirmDelete}
              />
            ))}
          </div>
        )}
      </main>
      <BookDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        mode="add"
        categories={categories}
        onSubmit={handleCreateBook}
      />
      <BookDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        mode="edit"
        book={selectedBook || undefined}
        categories={categories}
        onSubmit={handleUpdateBook}
      />
      <DeleteDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        book={selectedBook || undefined}
        onConfirm={handleDeleteBook}
      />
    </Layout>
  );
}

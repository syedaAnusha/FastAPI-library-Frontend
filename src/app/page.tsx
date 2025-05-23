"use client";

import { Header } from "@/components/Header";
import { Filters } from "@/components/Filters";
import BookCard from "@/components/BookCard";
import { BookDialog } from "@/components/BookDialog";
import { DeleteDialog } from "@/components/DeleteDialog";
import Layout from "../components/Layout";
import { useLibrary } from "@/hooks/useLibrary";
import { categories } from "@/types/types";
import PaginationControls from "@/components/Pagination";
import { Skeleton } from "@/components/ui/skeleton";

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
    currentPage,
    pageSize,

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
    setPage,
  } = useLibrary();

  const totalPages = Math.ceil(totalBooks / pageSize);

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(books.length)].map((_, index) => (
              <div key={index} className="flex flex-col space-y-3">
                <Skeleton className="h-[250px] w-full rounded-lg bg-gray-200" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[80%] bg-gray-200" />
                  <Skeleton className="h-4 w-[60%] bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        ) : books.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No books found</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {books.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onEdit={handleEditBook}
                  onConfirmDelete={handleConfirmDelete}
                />
              ))}
            </div>
            {totalBooks > 0 && (
              <div className="mt-8">
                <PaginationControls
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setPage}
                />
              </div>
            )}
          </>
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

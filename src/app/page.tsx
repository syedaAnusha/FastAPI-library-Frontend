"use client";

import { useState, useCallback, useEffect } from "react";
import { useBooks } from "../hooks/useBooks";
import { Book, BookCreate } from "../types/types";
import { Header } from "@/components/Header";
import { Filters } from "@/components/Filters";
import BookCard from "@/components/BookCard";
import { BookDialog } from "@/components/BookDialog";
import { DeleteDialog } from "@/components/DeleteDialog";
import Layout from "../components/Layout";

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

  if (error) {
    return <div className="text-center text-red-600 mt-8">{error}</div>;
  }

  return (
    <Layout>
      <Header
        searchTerm={searchTerm}
        onSearch={handleSearch}
        onAddBook={() => setIsAddDialogOpen(true)}
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
                onEdit={() => {
                  setSelectedBook(book);
                  setIsEditDialogOpen(true);
                }}
                onDelete={deleteBook}
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

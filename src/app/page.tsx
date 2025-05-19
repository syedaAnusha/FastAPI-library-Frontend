"use client";

import { useState, useCallback, useEffect } from "react";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  BookOpen,
  Filter,
  ChevronDown,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useBooks } from "../hooks/useBooks";
import { Book, BookCreate, categories } from "@/types/types";

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-purple-600 dark:text-purple-400 mr-2" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Library Management System
              </h1>
            </div>

            <div className="flex-1 max-w-md relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search by title, author, or description..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>

            <Button
              onClick={() => setIsAddDialogOpen(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              <Plus className="h-4 w-4 mr-2" /> Add Book
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Filters and Sorting */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="flex flex-wrap gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Category: {currentCategory}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleCategoryChange("All")}>
                  All
                </DropdownMenuItem>
                {categories.map((category) => (
                  <DropdownMenuItem
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                  >
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <ChevronDown className="h-4 w-4" />
                  Sort by: {currentSort.field} {currentSort.desc ? "↓" : "↑"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleSort("title")}>
                  Title
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort("author")}>
                  Author
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort("year")}>
                  Year
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="text-sm text-gray-500 dark:text-gray-400">
            {totalBooks} {totalBooks === 1 ? "book" : "books"} found
          </div>
        </div>

        {/* Books Grid */}
        {isLoading ? (
          <div className="text-center py-8">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {books.map((book) => (
              <Card
                key={book.id}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div
                  className={`h-32 bg-purple-600 flex items-center justify-center`}
                >
                  <h3 className="text-white text-xl font-bold px-4 text-center">
                    {book.title}
                  </h3>
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-lg">{book.title}</h4>
                      <p className="text-gray-500 dark:text-gray-400">
                        {book.author}
                      </p>
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
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedBook(book);
                      setIsEditDialogOpen(true);
                    }}
                  >
                    <Edit2 className="h-4 w-4 mr-1" /> Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
                    onClick={() => {
                      setSelectedBook(book);
                      setIsDeleteDialogOpen(true);
                    }}
                  >
                    <Trash2 className="h-4 w-4 mr-1" /> Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Add Book Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Book</DialogTitle>
            <DialogDescription>
              Enter the details of the book you want to add to your library.
            </DialogDescription>
          </DialogHeader>

          <form action={handleCreateBook}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Title
                </label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Enter book title"
                  required
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="author" className="text-sm font-medium">
                  Author
                </label>
                <Input
                  id="author"
                  name="author"
                  placeholder="Enter author name"
                  required
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="publishedYear" className="text-sm font-medium">
                  Published Year
                </label>
                <Input
                  id="publishedYear"
                  name="publishedYear"
                  placeholder="Enter published year"
                  type="number"
                  required
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="category" className="text-sm font-medium">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  defaultValue="Fiction"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid gap-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Enter book description"
                  rows={3}
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700"
              >
                Add Book
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Book Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Book</DialogTitle>
            <DialogDescription>
              Update the details of this book.
            </DialogDescription>
          </DialogHeader>

          <form action={handleUpdateBook}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="edit-title" className="text-sm font-medium">
                  Title
                </label>
                <Input
                  id="edit-title"
                  name="title"
                  defaultValue={selectedBook?.title}
                  required
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="edit-author" className="text-sm font-medium">
                  Author
                </label>
                <Input
                  id="edit-author"
                  name="author"
                  defaultValue={selectedBook?.author}
                  required
                />
              </div>

              <div className="grid gap-2">
                <label
                  htmlFor="edit-publishedYear"
                  className="text-sm font-medium"
                >
                  Published Year
                </label>
                <Input
                  id="edit-publishedYear"
                  name="publishedYear"
                  type="number"
                  defaultValue={selectedBook?.published_year}
                  required
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="edit-category" className="text-sm font-medium">
                  Category
                </label>
                <select
                  id="edit-category"
                  name="category"
                  defaultValue={selectedBook?.category}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid gap-2">
                <label
                  htmlFor="edit-description"
                  className="text-sm font-medium"
                >
                  Description
                </label>
                <textarea
                  id="edit-description"
                  name="description"
                  defaultValue={selectedBook?.description}
                  rows={3}
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700"
              >
                Update Book
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Book</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &ldquo;{selectedBook?.title}
              &rdquo;? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteBook}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

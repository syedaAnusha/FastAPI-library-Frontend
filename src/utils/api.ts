import { Book, BookCreate, CategoryResponse } from "../types/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const api = {
  // Basic CRUD operations
  async getAllBooks(): Promise<Book[]> {
    const response = await fetch(`${API_URL}/books/`);
    if (!response.ok) throw new Error("Failed to fetch books");
    return response.json();
  },

  async getBook(id: number): Promise<Book> {
    const response = await fetch(`${API_URL}/books/${id}/`);
    if (!response.ok) throw new Error("Failed to fetch book");
    return response.json();
  },

  async createBook(book: BookCreate): Promise<Book> {
    const response = await fetch(`${API_URL}/books/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    });
    if (!response.ok) throw new Error("Failed to create book");
    return response.json();
  },

  async updateBook(id: number, book: BookCreate): Promise<Book> {
    const response = await fetch(`${API_URL}/books/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    });
    if (!response.ok) throw new Error("Failed to update book");
    return response.json();
  },

  async deleteBook(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/books/${id}/`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete book");
  },

  // New endpoints for sorting, filtering, and searching
  async getSortedBooks(
    sortBy: "year" | "author" | "title",
    desc: boolean = false
  ): Promise<Book[]> {
    const response = await fetch(
      `${API_URL}/books/sort/${sortBy}?desc=${desc}`
    );
    if (!response.ok) throw new Error("Failed to fetch sorted books");
    return response.json();
  },

  async getBooksByCategory(category: string): Promise<CategoryResponse> {
    const response = await fetch(`${API_URL}/books/category/${category}`);
    if (!response.ok) throw new Error("Failed to fetch books by category");
    return response.json();
  },

  async searchBooks(params: {
    title?: string;
    author?: string;
    year?: number;
  }): Promise<Book[]> {
    const searchParams = new URLSearchParams();
    if (params.title) searchParams.append("title", params.title);
    if (params.author) searchParams.append("author", params.author);
    if (params.year) searchParams.append("year", params.year.toString());

    const response = await fetch(
      `${API_URL}/books/search/?${searchParams.toString()}`
    );
    if (!response.ok) throw new Error("Failed to search books");
    return response.json();
  },
};

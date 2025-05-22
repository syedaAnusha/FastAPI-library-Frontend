import { Book, BookCreate, PaginatedBooks } from "../types/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const api = {
  // Basic CRUD operations
  async getAllBooks(
    page: number = 1,
    page_size: number = 10
  ): Promise<PaginatedBooks> {
    const response = await fetch(
      `${API_URL}/books/?page=${page}&page_size=${page_size}`
    );
    if (!response.ok) throw new Error("Failed to fetch books");
    return response.json();
  },

  async getBook(id: number): Promise<Book> {
    const response = await fetch(`${API_URL}/books/${id}`);
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
    const response = await fetch(`${API_URL}/books/${id}`, {
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
    const response = await fetch(`${API_URL}/books/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error("Failed to delete book");
  },
  // Flexible search, filter, and sort endpoint
  async searchBooks(
    params: {
      title?: string;
      category?: string;
      sort_by?: "year" | "author" | "title";
      desc?: boolean;
    } = {}
  ): Promise<Book[]> {
    const searchParams = new URLSearchParams();

    if (params.title) searchParams.append("title", params.title);
    if (params.category) searchParams.append("category", params.category);
    if (params.sort_by) searchParams.append("sort_by", params.sort_by);
    if (params.desc !== undefined)
      searchParams.append("desc", params.desc.toString());

    const response = await fetch(
      `${API_URL}/books/combined?${searchParams.toString()}`
    );
    if (!response.ok) throw new Error("Failed to fetch books");
    return response.json();
  },
};

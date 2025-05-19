import { Book, BookCreate } from "../types/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const api = {
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
};

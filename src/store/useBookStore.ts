import { create } from "zustand";
import { debounce } from "lodash";
import { BookState, SearchParams } from "../types/types";
import { api } from "../utils/api";

const debouncedSearch = debounce(
  async (
    params: SearchParams,
    set: (state: Partial<BookState>) => void
  ): Promise<void> => {
    try {
      set({ isLoading: true });
      const searchResults = await api.searchBooks(params);
      set({
        books: searchResults,
        totalBooks: searchResults.length,
        error: null,
        isLoading: false,
      });
    } catch (e) {
      console.error("Error in debounced search:", e);
      set({ error: "Failed to search books", isLoading: false });
    }
  },
  300,
  { leading: false, trailing: true }
);

export const useBookStore = create<BookState>()((set, get) => ({
  // Initial state
  books: [],
  isLoading: true,
  error: null,
  totalBooks: 0,
  searchTerm: "",
  currentCategory: "All",
  currentSort: { field: "title", desc: false },
  selectedBook: null,
  isAddDialogOpen: false,
  isEditDialogOpen: false,
  isDeleteDialogOpen: false,

  // Basic setters
  setSearchTerm: (term) => set({ searchTerm: term }),
  setCurrentCategory: (category) => set({ currentCategory: category }),
  setSelectedBook: (book) => set({ selectedBook: book }),
  setIsAddDialogOpen: (isOpen) => set({ isAddDialogOpen: isOpen }),
  setIsEditDialogOpen: (isOpen) => set({ isEditDialogOpen: isOpen }),
  setIsDeleteDialogOpen: (isOpen) => set({ isDeleteDialogOpen: isOpen }),

  // Async actions
  loadBooks: async () => {
    try {
      set({ isLoading: true });
      const data = await api.getAllBooks();
      set({
        books: data,
        totalBooks: data.length,
        error: null,
        isLoading: false,
      });
    } catch (e) {
      console.error("Error loading books:", e);
      set({ error: "Failed to load books", isLoading: false });
    }
  },

  deleteBook: async (id) => {
    try {
      await api.deleteBook(id);
      set((state) => ({
        books: state.books.filter((book) => book.id !== id),
        totalBooks: state.books.length - 1,
        error: null,
        isDeleteDialogOpen: false,
        selectedBook: null,
      }));
    } catch (e) {
      console.error("Error deleting book:", e);
      set({ error: "Failed to delete book" });
      throw e;
    }
  },

  createBook: async (book) => {
    try {
      const newBook = await api.createBook(book);
      set((state) => ({
        books: [...state.books, newBook],
        totalBooks: state.totalBooks + 1,
        error: null,
        isAddDialogOpen: false,
      }));
    } catch (e) {
      console.error("Error creating book:", e);
      set({ error: "Failed to create book" });
      throw e;
    }
  },

  updateBook: async (id, book) => {
    try {
      const updatedBook = await api.updateBook(id, book);
      set((state) => ({
        books: state.books.map((b) => (b.id === id ? updatedBook : b)),
        error: null,
        isEditDialogOpen: false,
        selectedBook: null,
      }));
    } catch (e) {
      console.error("Error updating book:", e);
      set({ error: "Failed to update book" });
      throw e;
    }
  },

  sortBooks: async (sortBy, desc = false) => {
    try {
      set({ isLoading: true });
      const sortedBooks = await api.getSortedBooks(sortBy, desc);
      set({
        books: sortedBooks,
        totalBooks: sortedBooks.length,
        error: null,
        isLoading: false,
        currentSort: { field: sortBy, desc },
      });
    } catch (e) {
      console.error("Error sorting books:", e);
      set({ error: "Failed to sort books", isLoading: false });
    }
  },

  filterByCategory: async (category) => {
    try {
      set({ isLoading: true });
      if (category === "All") {
        get().loadBooks();
      } else {
        const response = await api.getBooksByCategory(category);
        set({
          books: response.books,
          totalBooks: response.total,
          error: null,
          isLoading: false,
          currentCategory: category,
        });
      }
    } catch (e) {
      console.error("Error filtering books:", e);
      set({ error: "Failed to filter books", isLoading: false });
    }
  },

  searchBooks: (params) => {
    debouncedSearch(params, set);
  },

  // UI Actions
  handleSearch: (value) => {
    const state = get();
    state.setSearchTerm(value);
    if (value) {
      state.searchBooks({ title: value });
    } else {
      state.loadBooks();
    }
  },

  handleCategoryChange: (category) => {
    const state = get();
    state.setCurrentCategory(category);
    state.filterByCategory(category);
  },

  handleSort: (field) => {
    const state = get();
    const desc =
      state.currentSort.field === field ? !state.currentSort.desc : false;
    state.sortBooks(field, desc);
  },

  handleAddBook: () => set({ isAddDialogOpen: true }),

  handleEditBook: (book) =>
    set({
      selectedBook: book,
      isEditDialogOpen: true,
    }),

  handleConfirmDelete: (id) => {
    const book = get().books.find((book) => book.id === id);
    set({
      selectedBook: book || null,
      isDeleteDialogOpen: true,
    });
  },
}));

import { create } from "zustand";
import { debounce } from "lodash";
import { BookState, SearchParams } from "../types/types";
import { api } from "../utils/api";

const debouncedSearch = debounce(
  async (
    params: SearchParams,
    state: BookState,
    set: (state: Partial<BookState>) => void
  ): Promise<void> => {
    try {
      set({ isLoading: true });
      const searchResults = await api.getAllBooks({
        ...params,
        page: state.currentPage,
        page_size: state.pageSize
      });
      set({
        books: searchResults.books,
        totalBooks: searchResults.total,
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
  currentPage: 1,
  pageSize: 10,
  searchTerm: "",
  currentCategory: "All",
  currentSort: { field: "title", desc: true },
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
      const state = get();
      set({ isLoading: true });
      const data = await api.getAllBooks({
        page: state.currentPage,
        page_size: state.pageSize
      });
      set({
        books: data.books,
        totalBooks: data.total,
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

  // Combined search, filter, and sort
  searchBooks: (params: Partial<SearchParams> = {}) => {
    const state = get();
    const { searchTerm, currentCategory, currentSort, currentPage, pageSize } = state;

    // Update the store's sort state if sort parameters are provided
    if (params.sort_by || typeof params.desc !== "undefined") {
      set({
        currentSort: {
          field: params.sort_by ?? currentSort.field,
          desc: typeof params.desc !== "undefined" ? params.desc : currentSort.desc,
        },
      });
    }

    const searchParams = {
      page: currentPage,
      page_size: pageSize,
      title: params.title ?? (searchTerm || undefined),
      category: params.category ?? (currentCategory !== "All" ? currentCategory : undefined),
      sort_by: params.sort_by ?? currentSort.field,
      desc: typeof params.desc !== "undefined" ? params.desc : currentSort.desc,
    };

    set({ isLoading: true });
    debouncedSearch(searchParams, state, set);
  },

  setPage: (page: number) => {
    set({ currentPage: page });
    get().searchBooks({}); // Use empty object to use current state values
  },

  getBookById: async (id: number) => {
    try {
      set({ isLoading: true });
      const book = await api.getBook(id);
      set({ selectedBook: book, error: null });
      return book;
    } catch (e) {
      console.error("Error fetching book:", e);
      set({ error: "Failed to fetch book details", isLoading: false });
      throw e;
    } finally {
      set({ isLoading: false });
    }
  },
  // UI Actions
  handleSearch: (value) => {
    set({ searchTerm: value });
    get().searchBooks({ title: value || undefined });
  },

  handleCategoryChange: (category) => {
    set({ currentCategory: category });
    get().searchBooks({ category: category !== "All" ? category : undefined });
  },
  handleSort: (field) => {
    const { currentSort } = get();
    // Preserve the sort direction when changing fields, only toggle if clicking the same field
    const desc =
      field === currentSort.field ? !currentSort.desc : currentSort.desc;
    set({ currentSort: { field, desc } });
    get().searchBooks({ sort_by: field, desc });
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

  sortBooks: async (
    sortBy: "year" | "author" | "title",
    desc: boolean = false
  ) => {
    get().searchBooks({ sort_by: sortBy, desc });
  },

  filterByCategory: async (category: string) => {
    get().searchBooks({ category: category !== "All" ? category : undefined });
  },
}));

"use client";

import { useCallback } from "react";
import BookList from "../components/BookList";
import BookForm from "../components/BookForm";
import Layout from "../components/Layout";
import { useBooks } from "../hooks/useBooks";

export default function Home() {
  const { loadBooks } = useBooks();

  const handleBookCreated = useCallback(() => {
    loadBooks();
  }, [loadBooks]);

  return (
    <Layout title="Library Management">
      <div className="grid gap-8 md:grid-cols-[2fr,1fr]">
        <BookList />
        <div>
          <h2 className="text-2xl font-bold mb-4">Add New Book</h2>
          <BookForm onBookCreated={handleBookCreated} />
        </div>
      </div>
    </Layout>
  );
}

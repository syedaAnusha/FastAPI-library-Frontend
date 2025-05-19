import { useState, useCallback } from "react";
import { BookCreate } from "../types/types";
import { api } from "../utils/api";

interface UseBookFormProps {
  formData: BookCreate;
  error: string | null;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  resetForm: () => void;
}

export const useBookForm = (onBookCreated: () => void): UseBookFormProps => {
  const [formData, setFormData] = useState<BookCreate>({
    title: "",
    author: "",
    published_year: new Date().getFullYear(),
  });
  const [error, setError] = useState<string | null>(null);

  const resetForm = useCallback(() => {
    setFormData({
      title: "",
      author: "",
      published_year: new Date().getFullYear(),
    });
    setError(null);
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value, type } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: type === "number" ? parseInt(value, 10) : value,
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent): Promise<void> => {
      e.preventDefault();
      try {
        await api.createBook(formData);
        resetForm();
        onBookCreated();
      } catch (error) {
        setError("Failed to create book");
        console.error("Error creating book:", error);
      }
    },
    [formData, onBookCreated, resetForm]
  );

  return {
    formData,
    error,
    handleInputChange,
    handleSubmit,
    resetForm,
  };
};

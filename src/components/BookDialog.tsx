import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Book } from "@/types/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookSchema, type BookFormData } from "@/schemas/bookSchema";
import { useEffect } from "react";

interface BookDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "add" | "edit";
  book?: Book;
  categories: string[];
  onSubmit: (formData: FormData) => Promise<void>;
}

export function BookDialog({
  open,
  onOpenChange,
  mode,
  book,
  categories,
  onSubmit,
}: BookDialogProps) {
  const isEdit = mode === "edit";

  const form = useForm<BookFormData>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: "",
      author: "",
      published_year: new Date().getFullYear(),
      category: "Fiction",
      description: "",
      cover_image: "",
    },
  });

  useEffect(() => {
    if (book && isEdit) {
      form.reset({
        title: book.title,
        author: book.author,
        published_year: book.published_year,
        category: book.category,
        description: book.description,
        cover_image: book.cover_image,
      });
    }
  }, [book, form, isEdit]);
  const handleSubmit = async (data: BookFormData) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === "published_year") {
        formData.append(key, String(Number(value))); // Ensure it's a number
      } else {
        formData.append(key, String(value));
      }
    });
    await onSubmit(formData);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Book" : "Add New Book"}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Update the details of this book."
              : "Enter the details of the book you want to add to your library."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor={`${mode}-title`} className="text-sm font-medium">
                Title
              </label>
              <Input
                id={`${mode}-title`}
                {...form.register("title")}
                placeholder="Enter book title"
                aria-invalid={!!form.formState.errors.title}
              />
              {form.formState.errors.title && (
                <span className="text-sm text-red-500">
                  {form.formState.errors.title.message}
                </span>
              )}
            </div>

            <div className="grid gap-2">
              <label htmlFor={`${mode}-author`} className="text-sm font-medium">
                Author
              </label>
              <Input
                id={`${mode}-author`}
                {...form.register("author")}
                placeholder="Enter author name"
                aria-invalid={!!form.formState.errors.author}
              />
              {form.formState.errors.author && (
                <span className="text-sm text-red-500">
                  {form.formState.errors.author.message}
                </span>
              )}
            </div>

            <div className="grid gap-2">
              <label
                htmlFor={`${mode}-published_year`}
                className="text-sm font-medium"
              >
                Published Year
              </label>
              <Input
                id={`${mode}-published_year`}
                type="number"
                {...form.register("published_year", { valueAsNumber: true })}
                placeholder="Enter published year"
                aria-invalid={!!form.formState.errors.published_year}
              />
              {form.formState.errors.published_year && (
                <span className="text-sm text-red-500">
                  {form.formState.errors.published_year.message}
                </span>
              )}
            </div>

            <div className="grid gap-2">
              <label
                htmlFor={`${mode}-category`}
                className="text-sm font-medium"
              >
                Category
              </label>
              <select
                id={`${mode}-category`}
                {...form.register("category")}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                aria-invalid={!!form.formState.errors.category}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {form.formState.errors.category && (
                <span className="text-sm text-red-500">
                  {form.formState.errors.category.message}
                </span>
              )}
            </div>

            <div className="grid gap-2">
              <label
                htmlFor={`${mode}-description`}
                className="text-sm font-medium"
              >
                Description
              </label>
              <textarea
                id={`${mode}-description`}
                {...form.register("description")}
                placeholder="Enter book description"
                rows={3}
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                aria-invalid={!!form.formState.errors.description}
              />
              {form.formState.errors.description && (
                <span className="text-sm text-red-500">
                  {form.formState.errors.description.message}
                </span>
              )}
            </div>

            <div className="grid gap-2">
              <label
                htmlFor={`${mode}-cover_image`}
                className="text-sm font-medium"
              >
                Cover Image URL
              </label>
              <Input
                id={`${mode}-cover_image`}
                {...form.register("cover_image")}
                type="url"
                placeholder="Enter cover image URL"
                aria-invalid={!!form.formState.errors.cover_image}
              />
              {form.formState.errors.cover_image && (
                <span className="text-sm text-red-500">
                  {form.formState.errors.cover_image.message}
                </span>
              )}
              <p className="text-xs text-gray-500">
                Provide a direct link to the book cover image (optional)
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                form.reset();
                onOpenChange(false);
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting
                ? "Saving..."
                : isEdit
                ? "Update Book"
                : "Add Book"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

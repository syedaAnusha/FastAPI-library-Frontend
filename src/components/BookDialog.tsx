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

        <form action={onSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor={`${mode}-title`} className="text-sm font-medium">
                Title
              </label>
              <Input
                id={`${mode}-title`}
                name="title"
                defaultValue={book?.title}
                placeholder="Enter book title"
                required
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor={`${mode}-author`} className="text-sm font-medium">
                Author
              </label>
              <Input
                id={`${mode}-author`}
                name="author"
                defaultValue={book?.author}
                placeholder="Enter author name"
                required
              />
            </div>

            <div className="grid gap-2">
              <label
                htmlFor={`${mode}-publishedYear`}
                className="text-sm font-medium"
              >
                Published Year
              </label>
              <Input
                id={`${mode}-publishedYear`}
                name="publishedYear"
                type="number"
                defaultValue={book?.published_year}
                placeholder="Enter published year"
                required
              />
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
                name="category"
                defaultValue={book?.category || "Fiction"}
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
                htmlFor={`${mode}-description`}
                className="text-sm font-medium"
              >
                Description
              </label>
              <textarea
                id={`${mode}-description`}
                name="description"
                defaultValue={book?.description}
                placeholder="Enter book description"
                rows={3}
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />{" "}
            </div>

            <div className="grid gap-2">
              <label
                htmlFor={`${mode}-coverImage`}
                className="text-sm font-medium"
              >
                Cover Image URL
              </label>
              <Input
                id={`${mode}-coverImage`}
                name="coverImage"
                type="url"
                defaultValue={book?.cover_image}
                placeholder="Enter cover image URL"
              />
              <p className="text-xs text-gray-500">
                Provide a direct link to the book cover image (optional)
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
              {isEdit ? "Update Book" : "Add Book"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

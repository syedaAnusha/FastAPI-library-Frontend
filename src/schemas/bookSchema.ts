import * as z from "zod";

export const bookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  published_year: z
    .number()
    .min(1000, "Year must be after 1000")
    .max(new Date().getFullYear(), "Year cannot be in the future"),
  category: z.string().min(1, "Category is required"),
  description: z.string(),
  cover_image: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),
});

export type BookFormData = z.infer<typeof bookSchema>;

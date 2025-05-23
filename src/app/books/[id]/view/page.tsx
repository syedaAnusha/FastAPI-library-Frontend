import BookDetails from "@/components/BookDetails";
import { ErrorBoundary } from "react-error-boundary";
// import { Metadata } from "next";
// import { api } from "@/utils/api";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   // read route params
//   const { id } = await params;
//   try {
//     const book = await api.getBook(parseInt(id));
//     return {
//       title: `${book.title} by ${book.author} | ReadStack`,
//       description:
//         book.description || `View details for ${book.title} by ${book.author}`,
//       openGraph: {
//         title: book.title,
//         description: book.description,
//         images: [book.cover_image || ""],
//       },
//     };
//   } catch {
//     return {
//       title: "Book Details | ReadStack",
//       description: "View book details",
//     };
//   }
// }

export default async function Page({ params }: Props) {
  const { id } = await params;

  return (
    <ErrorBoundary fallback={<p>Error while fetching book details</p>}>
      <BookDetails id={id} />
    </ErrorBoundary>
  );
}

"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { useBookStore } from "@/store/useBookStore";

interface Props {
  id: string;
}

export default function BookDetails({ id }: Props) {
  const router = useRouter();
  const getBookById = useBookStore((state) => state.getBookById);
  const selectedBook = useBookStore((state) => state.selectedBook);
  const isLoading = useBookStore((state) => state.isLoading);
  const error = useBookStore((state) => state.error);

  useEffect(() => {
    const fetchBook = async () => {
      const bookId = parseInt(id);
      if (isNaN(bookId)) return;
      await getBookById(bookId);
    };

    fetchBook();
  }, [id, getBookById]);

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error || !selectedBook) {
    return (
      <div className="text-center text-red-600 mt-8">
        {error || "Book not found"}
      </div>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="outline"
          className="mb-8"
          onClick={() => router.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative h-[400px] bg-purple-600 rounded-lg overflow-hidden">
            {selectedBook.cover_image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={selectedBook.cover_image}
                alt={`Cover of ${selectedBook.title}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <h3 className="text-white text-xl font-bold px-4 text-center">
                  No Image Available
                </h3>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">{selectedBook.title}</h1>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                by {selectedBook.author}
              </p>
            </div>

            <div className="space-y-2">
              <Badge variant="secondary" className="text-base">
                {selectedBook.category}
              </Badge>
              <p className="text-gray-600 dark:text-gray-400">
                Published in {selectedBook.published_year}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-2">Description</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {selectedBook.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

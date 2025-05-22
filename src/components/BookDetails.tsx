/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section with gradient background */}{" "}
      <div className="relative py-32 px-4">
        {selectedBook.cover_image ? (
          <div className="absolute inset-0 z-0">
            <img
              src={selectedBook.cover_image}
              alt=""
              className="object-cover w-full h-full"
            />
            {/* Gradient overlays for better text readability and smooth transition */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-50 dark:from-gray-900 via-transparent to-transparent" />
          </div>
        ) : (
          <>
            <div className="absolute inset-0 bg-purple-600 z-0" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-50 dark:from-gray-900 via-transparent to-transparent" />
          </>
        )}

        <div className="absolute top-4 left-4 z-10">
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="bg-white/90 hover:bg-white"
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Library
          </Button>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 hover:bg-white/30 text-white border-none">
              {selectedBook.category}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-sm">
              {selectedBook.title}
            </h1>
            <p className="text-xl text-white/90 mb-6">
              by {selectedBook.author}
            </p>
          </div>
        </div>
      </div>{" "}
      {/* Book Details */}
      <div className="container mx-auto px-4 mt-16">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          {/* Book Information */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Left column - Description */}
              <div className="md:col-span-2 space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    About this book
                  </h3>
                  <div className="prose prose-gray dark:prose-invert max-h-[80vh] max-w-none overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                      {selectedBook.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right column - Metadata */}
              <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Details
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-start">
                      <User className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-3 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Author
                        </h4>
                        <p className="text-gray-900 dark:text-white">
                          {selectedBook.author}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-3 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Published
                        </h4>
                        <p className="text-gray-900 dark:text-white">
                          {selectedBook.published_year}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Tag className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-3 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Category
                        </h4>
                        <p className="text-gray-900 dark:text-white">
                          {selectedBook.category}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

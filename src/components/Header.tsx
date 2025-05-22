import { Search, Plus, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchInput } from "./SearchInput";

interface LibraryHeaderProps {
  searchTerm: string;
  onSearch: (value: string) => void;
  onAddBook: () => void;
}

export function Header({
  searchTerm,
  onSearch,
  onAddBook,
}: LibraryHeaderProps) {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center">
            <BookOpen className="h-8 w-8 text-purple-600 dark:text-purple-400 mr-2" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              QuickShelf
            </h1>
          </div>

          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />{" "}
            <SearchInput
              placeholder="Search by title"
              value={searchTerm}
              onChange={onSearch}
            />
          </div>

          <Button
            onClick={onAddBook}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            <Plus className="h-4 w-4 mr-2" /> Add Book
          </Button>
        </div>
      </div>
    </header>
  );
}

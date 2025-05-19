import { Filter, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface LibraryFiltersProps {
  currentCategory: string;
  currentSort: { field: "title" | "author" | "year"; desc: boolean };
  totalBooks: number;
  onCategoryChange: (category: string) => void;
  onSortChange: (field: "title" | "author" | "year") => void;
  categories: string[];
}

export function Filters({
  currentCategory,
  currentSort,
  totalBooks,
  onCategoryChange,
  onSortChange,
  categories,
}: LibraryFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
      <div className="flex flex-wrap gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Category: {currentCategory}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => onCategoryChange("All")}>
              All
            </DropdownMenuItem>
            {categories.map((category) => (
              <DropdownMenuItem
                key={category}
                onClick={() => onCategoryChange(category)}
              >
                {category}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <ChevronDown className="h-4 w-4" />
              Sort by: {currentSort.field} {currentSort.desc ? "↓" : "↑"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => onSortChange("title")}>
              Title
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSortChange("author")}>
              Author
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSortChange("year")}>
              Year
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="text-sm text-gray-500 dark:text-gray-400">
        {totalBooks} {totalBooks === 1 ? "book" : "books"} found
      </div>
    </div>
  );
}

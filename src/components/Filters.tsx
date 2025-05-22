import { Filter, ChevronDown, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTransition } from "react";

interface LibraryFiltersProps {
  currentCategory: string;
  currentSort: { field: "title" | "author" | "year"; desc: boolean };
  totalBooks: number;
  onCategoryChange: (category: string) => void;
  onSortChange: (field: "title" | "author" | "year", desc?: boolean) => void;
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
  const [isPending, startTransition] = useTransition();
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
            {" "}
            <DropdownMenuItem
              onClick={() => {
                startTransition(() => {
                  onCategoryChange("All");
                });
              }}
            >
              All
              {isPending && currentCategory === "All" ? " ..." : ""}
            </DropdownMenuItem>
            {categories.map((category) => (
              <DropdownMenuItem
                key={category}
                onClick={() => {
                  startTransition(() => {
                    onCategoryChange(category);
                  });
                }}
              >
                {category}
                {isPending && category === currentCategory ? " ..." : ""}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>{" "}
        {/* Sort Field Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <ChevronDown className="h-4 w-4" />
              Sort by: {currentSort.field}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => {
                startTransition(() => {
                  onSortChange("title", currentSort.desc);
                });
              }}
            >
              Title
              {isPending && currentSort.field === "title" ? " ..." : ""}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                startTransition(() => {
                  onSortChange("author", currentSort.desc);
                });
              }}
            >
              Author
              {isPending && currentSort.field === "author" ? " ..." : ""}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                startTransition(() => {
                  onSortChange("year", currentSort.desc);
                });
              }}
            >
              Year
              {isPending && currentSort.field === "year" ? " ..." : ""}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* Sort Direction Button */}
        <Button
          variant="outline"
          className="gap-2"
          onClick={() => {
            startTransition(() => {
              onSortChange(currentSort.field, !currentSort.desc);
            });
          }}
        >
          <ArrowUpDown className="h-4 w-4" />
          {currentSort.desc ? "Descending" : "Ascending"}
        </Button>
      </div>

      <div className="text-sm text-gray-500 dark:text-gray-400">
        {totalBooks} {totalBooks === 1 ? "book" : "books"} found
      </div>
    </div>
  );
}

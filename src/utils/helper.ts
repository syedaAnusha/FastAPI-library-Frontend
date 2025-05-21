/**
 * Generates an array of page numbers for pagination, including ellipsis where needed
 * @param currentPage - The current active page number
 * @param totalPages - The total number of pages available
 * @returns An array of numbers representing the page numbers to display.
 * Returns 0 for positions where an ellipsis should be shown.
 * @example
 * getPageNumbers(5, 10) // returns [1, 0, 4, 5, 6, 0, 10]
 * getPageNumbers(2, 3) // returns [1, 2, 3]
 */
export const getPageNumbers = (
  currentPage: number,
  totalPages: number
): number[] => {
  const pages = [];
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    if (currentPage <= 3) {
      for (let i = 1; i <= 3; i++) pages.push(i);
      pages.push(0); // represents ellipsis
      pages.push(totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1);
      pages.push(0);
      for (let i = totalPages - 2; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      pages.push(0);
      pages.push(currentPage - 1);
      pages.push(currentPage);
      pages.push(currentPage + 1);
      pages.push(0);
      pages.push(totalPages);
    }
  }
  return pages;
};

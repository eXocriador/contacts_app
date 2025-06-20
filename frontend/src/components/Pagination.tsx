import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const getPageNumbers = (current: number, total: number) => {
  const pages: (number | string)[] = [];
  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i);
    return pages;
  }
  if (current <= 4) {
    pages.push(1, 2, 3, 4, 5, "...", total);
  } else if (current >= total - 3) {
    pages.push(1, "...", total - 4, total - 3, total - 2, total - 1, total);
  } else {
    pages.push(1, "...", current - 1, current, current + 1, "...", total);
  }
  return pages;
};

const Pagination: React.FC<PaginationProps> = React.memo(
  ({ currentPage, totalPages, onPageChange, className }) => {
    if (totalPages <= 1) return null;
    const pages = getPageNumbers(currentPage, totalPages);

    return (
      <nav
        className={`flex items-center gap-1 ${className || ""}`}
        aria-label="Pagination"
      >
        <button
          className="btn-secondary px-3 py-2 text-sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          Previous
        </button>
        {pages.map((page, idx) =>
          typeof page === "number" ? (
            <button
              key={page}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                page === currentPage
                  ? "bg-primary-500 text-white shadow"
                  : "bg-surface text-text-secondary hover:bg-primary-100"
              }`}
              onClick={() => onPageChange(page)}
              aria-current={page === currentPage ? "page" : undefined}
            >
              {page}
            </button>
          ) : (
            <span
              key={"ellipsis-" + idx}
              className="px-2 text-text-secondary select-none"
            >
              ...
            </span>
          )
        )}
        <button
          className="btn-secondary px-3 py-2 text-sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          Next
        </button>
      </nav>
    );
  }
);

export default Pagination;

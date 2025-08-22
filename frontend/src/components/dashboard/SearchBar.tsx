// This file is responsible for the search bar and its logic.
import { ChangeEvent } from "react";

interface SearchBarProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export default function SearchBar({
  searchQuery = "",
  onSearchChange,
}: SearchBarProps) {
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearchChange?.(e.target.value);
  };

  const clearSearch = () => {
    onSearchChange?.("");
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="w-64 pl-10 pr-10 py-2.5 bg-[rgb(var(--color-background))] border border-default rounded-lg text-sm focus:ring-2 focus:ring-[rgb(var(--color-primary))] focus:border-transparent transition-all text-slate-700 dark:text-slate-300 placeholder-slate-400 dark:placeholder-slate-500"
      />
      {/* Search icon */}
      <svg
        className="absolute left-3 top-3 h-4 w-4 text-secondary"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      {/* Clear button */}
      {searchQuery && (
        <button
          onClick={clearSearch}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary hover:text-primary transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
}

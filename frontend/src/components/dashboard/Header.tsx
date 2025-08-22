// This file focuses on the overall layout and composition of the header.
import SearchBar from "./SearchBar";

interface HeaderProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export default function Header({ searchQuery, onSearchChange }: HeaderProps) {
  return (
    <header className="bg-surface/80 backdrop-blur-md border-b border-default px-6 py-4 flex items-center justify-between flex-shrink-0">
      {/* Left side - Logo and Project name */}
      <div className="flex items-center space-x-3">
        {/* Logo and Project Name */}
        <div className="w-8 h-8 bg-gradient-to-r from-[rgb(var(--color-primary))] to-blue-600 rounded-lg flex items-center justify-center shadow-md">
          <span className="text-white font-bold text-sm">T</span>
        </div>
        <div className="flex flex-col">
          <h1 className="text-lg font-semibold text-primary leading-tight">
            Task Manager
          </h1>
          <div className="flex items-center space-x-1 mt-0.5">
            <button
              className={`px-2 py-0.5 text-xs font-medium rounded transition-all ${"text-[rgb(var(--color-primary))] bg-[rgb(var(--color-primary))]/10"}`}
            >
              Board
            </button>
          </div>
        </div>
      </div>

      {/* Right side - Search */}
      <div className="flex items-center space-x-3">
        <SearchBar searchQuery={searchQuery} onSearchChange={onSearchChange} />
      </div>
    </header>
  );
}

import Link from "next/link";

// This page will be generated at build time
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mt-20">
          <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-6">
            Task Manager
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
            Organize your work with our modern Kanban board. Drag, drop, and
            manage tasks efficiently.
          </p>

          <div className="flex justify-center space-x-4">
            <Link
              href="/login"
              className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors"
            >
              Try it out!
            </Link>
            <Link
              href="/about"
              className="px-8 py-3 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold rounded-lg transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">
              Drag & Drop
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Intuitive task management with smooth drag and drop functionality.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-emerald-500"
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
            </div>
            <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">
              Smart Search
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Find tasks quickly with our powerful search functionality.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-amber-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">
              Dark Mode
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Work comfortably with automatic dark mode support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// This makes the page static at build time
export const dynamic = "force-static";

export const metadata = {
  title: "Task Manager - Organize Your Work",
  description: "Modern Kanban board for efficient task management",
};

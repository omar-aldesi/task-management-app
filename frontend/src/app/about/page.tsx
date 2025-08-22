import { headers } from "next/headers";
import Link from "next/link";

// This page will be server-side rendered on each request
export default async function AboutPage() {
  // This will run on the server for each request
  const headersList = headers();
  const userAgent = (await headersList).get("user-agent") || "Unknown";
  const currentTime = new Date().toLocaleString();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-8 text-center">
            About Task Manager
          </h1>

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">
              Built with Modern Technology
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-2 text-slate-900 dark:text-white">
                  Frontend
                </h3>
                <ul className="text-slate-600 dark:text-slate-400 space-y-1">
                  <li>• Next.js 14 with App Router</li>
                  <li>• React 18 with TypeScript</li>
                  <li>• Tailwind CSS for styling</li>
                  <li>• @dnd-kit for drag and drop</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2 text-slate-900 dark:text-white">
                  Features
                </h3>
                <ul className="text-slate-600 dark:text-slate-400 space-y-1">
                  <li>• Real-time task management</li>
                  <li>• Drag and drop interface</li>
                  <li>• Search and filtering</li>
                  <li>• Dark mode support</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Server-side rendered content */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-3 text-blue-900 dark:text-blue-300">
              Server Information (SSR Demo)
            </h3>
            <div className="text-sm text-blue-800 dark:text-blue-200 space-y-2">
              <p>
                <strong>Page rendered at:</strong> {currentTime}
              </p>
              <p>
                <strong>Your browser:</strong> {userAgent.split(" ")[0]}
              </p>
              <p>
                <strong>Rendering method:</strong> Server-Side Rendering (SSR)
              </p>
            </div>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 mt-6 px-6 py-3 
             bg-gradient-to-r from-blue-500 to-indigo-500 
             text-white font-semibold rounded-xl shadow-md
             hover:from-blue-600 hover:to-indigo-600 
             transition-all duration-300 ease-out
             hover:scale-105 active:scale-95"
            >
              🚀 Join us today!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// This forces the page to be server-side rendered
export const dynamic = "force-dynamic";

export const metadata = {
  title: "About - Task Manager",
  description: "Learn more about our task management application",
};

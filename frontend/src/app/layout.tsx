import { AppProvider } from "@/providers/AppProvider";
import { PageTransitionProvider } from "@/providers/PageTransitionProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Task Manager - Organize Your Work",
  description:
    "A modern task management application with drag & drop functionality",
  keywords: ["task management", "productivity", "kanban board"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <AppProvider>
          <div className="h-screenbg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
            <PageTransitionProvider>{children}</PageTransitionProvider>
          </div>
        </AppProvider>
      </body>
    </html>
  );
}

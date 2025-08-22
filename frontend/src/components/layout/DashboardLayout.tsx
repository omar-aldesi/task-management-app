"use client";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="h-full bg-[rgb(var(--color-background))] flex flex-col">
      {/* Main Content: Make this a flex container */}
      <main className="flex-1 flex flex-col overflow-hidden min-h-0">
        {/* Child component will now fill the available space */}
        {children}
      </main>
    </div>
  );
}

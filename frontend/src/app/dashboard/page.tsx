"use client";

import Header from "@/components/dashboard/Header";
import TaskBoard from "@/components/tasks/TaskBoard";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const router = useRouter();

  // Check if user is authenticated
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="h-full flex flex-col">
      {/* Header - fixed height */}
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      {/* TaskBoard - takes remaining height */}
      <div className="flex-1 min-h-0">
        <TaskBoard searchQuery={searchQuery} />
      </div>
    </div>
  );
}

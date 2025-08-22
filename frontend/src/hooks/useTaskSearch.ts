import { Task } from "@/types/tasks";
import { useCallback, useEffect, useMemo, useState } from "react";

export function useTaskSearch(
  tasks: Record<string, Task[]>,
  searchQuery: string
) {
  const [filteredTasks, setFilteredTasks] =
    useState<Record<string, Task[]>>(tasks);

  const filterTasks = useCallback(
    (query: string) => {
      if (!query.trim()) {
        setFilteredTasks(tasks);
        return;
      }

      const filtered: Record<string, Task[]> = {};
      Object.keys(tasks).forEach((columnId) => {
        const columnTasks = tasks[columnId] || [];
        filtered[columnId] = columnTasks.filter(
          (task) =>
            task.title.toLowerCase().includes(query.toLowerCase()) ||
            (task.description &&
              task.description.toLowerCase().includes(query.toLowerCase()))
        );
      });
      setFilteredTasks(filtered);
    },
    [tasks]
  );

  useEffect(() => {
    filterTasks(searchQuery);
  }, [tasks, searchQuery, filterTasks]);

  // Memoize the calculations to prevent unnecessary re-renders
  const stats = useMemo(() => {
    const totalFilteredTasks = Object.values(filteredTasks).reduce(
      (acc, tasks) => acc + (tasks?.length || 0),
      0
    );
    const totalTasks = Object.values(tasks).reduce(
      (acc, tasks) => acc + (tasks?.length || 0),
      0
    );

    return { totalFilteredTasks, totalTasks };
  }, [filteredTasks, tasks]);

  return {
    filteredTasks,
    ...stats,
  };
}

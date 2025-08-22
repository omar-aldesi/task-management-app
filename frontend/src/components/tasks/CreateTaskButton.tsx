"use client";

import { PlusIcon } from "@heroicons/react/24/outline";

interface CreateTaskButtonProps {
  columnId: string;
  onCreateTask: (columnId: string) => void;
}

export default function CreateTaskButton({
  columnId,
  onCreateTask,
}: CreateTaskButtonProps) {
  return (
    <button
      onClick={() => onCreateTask(columnId)}
      className="w-full p-3 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-all duration-200 flex items-center justify-center group"
    >
      <PlusIcon className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors mr-2" />
      <span className="text-sm font-medium text-slate-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        Add Task
      </span>
    </button>
  );
}

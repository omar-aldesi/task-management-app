import { PlusIcon } from "@heroicons/react/24/outline";
import BoardStats from "./BoardStats";

interface TaskBoardHeaderProps {
  searchQuery: string;
  totalFilteredTasks: number;
  totalTasks: number;
  columnsLength: number;
  onAddColumn: () => void;
  onCreateTask: () => void;
}

export default function TaskBoardHeader({
  searchQuery,
  totalFilteredTasks,
  totalTasks,
  columnsLength,
  onAddColumn,
  onCreateTask,
}: TaskBoardHeaderProps) {
  return (
    <div className="flex-shrink-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Project Board
            </h1>
            <BoardStats
              searchQuery={searchQuery}
              totalFilteredTasks={totalFilteredTasks}
              totalTasks={totalTasks}
              columnsLength={columnsLength}
            />
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={onAddColumn}
              className="p-4 py-2 bg-slate-500 hover:bg-slate-600 text-white text-sm font-medium rounded-xl transition-all duration-200 shadow-lg shadow-slate-500/25 hover:shadow-slate-500/40 flex items-center space-x-2"
            >
              <PlusIcon className="w-4 h-4" />
              <span>Add Column</span>
            </button>
            <button
              onClick={onCreateTask}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 flex items-center space-x-2"
            >
              <PlusIcon className="w-4 h-4" />
              <span>Add Task</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

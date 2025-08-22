import { Task } from "@/types/tasks";
import { formatDate, getUserAvatarProps } from "@/utils/taskHelpers";
import {
  CalendarIcon,
  ChatBubbleLeftIcon,
  PaperClipIcon,
} from "@heroicons/react/24/outline";

interface TaskCardProps {
  task: Task;
  isDragging?: boolean;
}

export default function TaskCard({ task, isDragging }: TaskCardProps) {
  const { initials, colorClass } = getUserAvatarProps(task.userId);

  return (
    <div
      className={`
        group relative bg-white dark:bg-slate-900 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-700 
        hover:shadow-md hover:border-slate-300 dark:hover:border-slate-600 
        ${isDragging ? "pointer-events-none" : ""}
      `}
    >
      {/* Header with menu button */}
      <div className="flex items-center justify-between mb-3">
        <div></div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <svg
            className="w-4 h-4 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 8h16M4 16h16"
            />
          </svg>
        </div>
      </div>

      {/* Title */}
      <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-sm mb-2 leading-tight line-clamp-2">
        {task.title}
      </h4>

      {/* Description */}
      {task.description && (
        <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 line-clamp-2 leading-relaxed">
          {task.description}
        </p>
      )}

      {/* Task Meta */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-3">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1">
            <ChatBubbleLeftIcon className="w-3 h-3" />
            <span>{0}</span>
          </div>
          <div className="flex items-center space-x-1">
            <PaperClipIcon className="w-3 h-3" />
            <span>{0}</span>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <CalendarIcon className="w-3 h-3" />
          <span>{formatDate(task.updatedAt)}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div
            className={`w-2 h-2 rounded-full ${
              task.status === "done"
                ? "bg-emerald-400"
                : task.status === "in progress"
                ? "bg-amber-400"
                : "bg-slate-400"
            }`}
          />
          <span className="text-xs text-slate-500 dark:text-slate-400 capitalize">
            {task.status}
          </span>
        </div>
        <div
          className={`
            w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm
            ${colorClass}
          `}
        >
          {initials}
        </div>
      </div>
    </div>
  );
}

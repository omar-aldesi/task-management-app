"use client";

import { Task } from "@/types/tasks";
import { getColumnStyle } from "@/utils/columnHelpers";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { memo } from "react";
import CreateTaskButton from "./CreateTaskButton";
import DeleteColumnButton from "./DeleteColumnButton";
import DraggableTaskCard from "./DraggableTaskCard";

interface DroppableColumnProps {
  id: string;
  title: string;
  tasks: Task[];
  onTaskClick: (task: Task) => void;
  onCreateTask: (columnId: string) => void;
}

const DroppableColumn = memo(function DroppableColumn({
  id,
  title,
  tasks,
  onTaskClick,
  onCreateTask,
}: DroppableColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id,
    data: {
      type: "column",
      columnId: id,
    },
  });

  const taskIds = tasks.map((t) => t.id);
  const columnStyle = getColumnStyle(id);

  return (
    <div
      ref={setNodeRef}
      data-column-id={id}
      className={`
        w-80 flex-shrink-0 h-full flex flex-col bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg border transition-all duration-200
        ${columnStyle.border} ${columnStyle.accent} border-l-4
        ${
          isOver
            ? "ring-2 ring-blue-400/50 shadow-xl bg-white dark:bg-slate-800"
            : ""
        }
      `}
      style={{
        // Prevent creating new stacking context that could interfere with modals
        transform: isOver ? "scale(1.02)" : "scale(1)",
        isolation: "auto",
      }}
    >
      {/* Column Header */}
      <div
        className={`
          ${columnStyle.header} rounded-t-2xl px-6 py-4 border-b ${columnStyle.border} flex-shrink-0 backdrop-blur-sm
        `}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h3
              className={`font-bold text-sm uppercase tracking-wider ${columnStyle.headerText}`}
            >
              {title}
            </h3>
            <span
              className={`
                px-3 py-1.5 rounded-full text-xs font-bold shadow-sm ${columnStyle.count}
              `}
            >
              {tasks.length}
            </span>
          </div>
          {/* Delete Button Component */}
          <DeleteColumnButton
            columnId={id}
            columnTitle={title}
            taskCount={tasks.length}
          />
        </div>
      </div>

      {/* Tasks Container */}
      <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
        <div
          className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-3 min-h-0"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "rgb(148 163 184 / 0.3) transparent",
          }}
        >
          {tasks.map((task) => (
            <DraggableTaskCard
              key={task.id}
              task={task}
              columnId={id}
              onTaskClick={onTaskClick}
            />
          ))}
          <CreateTaskButton columnId={id} onCreateTask={onCreateTask} />
        </div>
      </SortableContext>
    </div>
  );
});

export default DroppableColumn;

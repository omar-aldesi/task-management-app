"use client";

import { Task } from "@/types/tasks";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TaskCard from "./TaskCard";

interface DraggableTaskCardProps {
  task: Task;
  columnId: string;
  onTaskClick: (task: Task) => void;
}

export default function DraggableTaskCard({
  task,
  columnId,
  onTaskClick,
}: DraggableTaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "task",
      task,
      columnId,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleClick = (e: React.MouseEvent) => {
    // Only trigger click if not dragging
    if (!isDragging) {
      e.stopPropagation();
      onTaskClick(task);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      data-task-id={task.id}
      onClick={handleClick}
      className={`
        transition-all duration-200 cursor-grab active:cursor-grabbing hover:cursor-pointer
        ${
          isDragging
            ? "ring-2 ring-blue-500/50 shadow-xl rotate-3 scale-105 z-50"
            : ""
        }
      `}
    >
      <TaskCard task={task} isDragging={isDragging} />
    </div>
  );
}

import { Task } from "@/types/tasks";
import { useState } from "react";

export function useTaskModal() {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createColumnId, setCreateColumnId] = useState<string>("");

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setCreateColumnId("");
    setIsModalOpen(true);
  };

  const handleCreateTask = (columnId?: string) => {
    setSelectedTask(null);
    setCreateColumnId(columnId || "to do");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
    setCreateColumnId("");
  };

  return {
    selectedTask,
    isModalOpen,
    createColumnId,
    handleTaskClick,
    handleCreateTask,
    handleCloseModal,
  };
}

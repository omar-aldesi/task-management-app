import { Task } from "@/types/tasks";

export interface DragEndEvent {
  active: {
    id: string;
    data: {
      current: {
        task: Task;
        columnId: string;
      };
    };
  };
  over: {
    id: string;
    data: {
      current: {
        type: string;
        columnId?: string;
      };
    };
  } | null;
}

export const moveTaskBetweenColumns = (
  tasks: Record<string, Task[]>,
  activeId: string,
  overId: string,
  activeColumnId: string,
  overColumnId: string
): Record<string, Task[]> => {
  const activeTasks = [...tasks[activeColumnId]];
  const overTasks =
    activeColumnId === overColumnId ? activeTasks : [...tasks[overColumnId]];

  // Find the active task
  const activeIndex = activeTasks.findIndex((task) => task.id === activeId);
  const activeTask = activeTasks[activeIndex];

  if (!activeTask) return tasks;

  // Remove from active column
  activeTasks.splice(activeIndex, 1);

  // Add to over column
  if (activeColumnId === overColumnId) {
    // Same column - reorder
    const overIndex = overTasks.findIndex((task) => task.id === overId);
    activeTasks.splice(overIndex, 0, activeTask);
  } else {
    // Different column - move and update status
    const updatedTask = {
      ...activeTask,
      status: overColumnId as string,
    };

    if (overId === overColumnId) {
      // Dropped on column itself - add to end
      overTasks.push(updatedTask);
    } else {
      // Dropped on specific task - insert before it
      const overIndex = overTasks.findIndex((task) => task.id === overId);
      overTasks.splice(overIndex, 0, updatedTask);
    }
  }

  return {
    ...tasks,
    [activeColumnId]: activeTasks,
    [overColumnId]: overTasks,
  };
};

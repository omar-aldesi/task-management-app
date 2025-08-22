import { Task } from "@/types/tasks";
import { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { useCallback, useState } from "react";

interface UseDragAndDropProps {
  tasks: Record<string, Task[]>;
  moveTask: (
    taskId: string,
    fromStatus: string,
    toStatus: string,
    newPosition?: number
  ) => boolean | Promise<boolean>;
  moveTaskWithArrayMove: (
    taskId: string,
    columnId: string,
    activeIndex: number,
    targetIndex: number
  ) => boolean | Promise<boolean>;
}

export function useDragAndDrop({
  tasks,
  moveTask,
  moveTaskWithArrayMove,
}: UseDragAndDropProps) {
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const { active } = event;
    const task = active.data.current?.task;
    if (task) {
      setActiveTask(task);
      console.log("🚀 Drag started:", task.title);
    }
  }, []);

  const handleDragEnd = useCallback(
    async (event: DragEndEvent) => {
      const { active, over } = event;

      setActiveTask(null);

      if (!over) {
        console.log("❌ Dropped outside valid area");
        return;
      }

      const activeColumnId = active.data.current?.columnId as Task["status"];
      const overColumnId = (over.data.current?.columnId ||
        over.id) as Task["status"];

      console.log("📍 Drop details:", {
        taskId: active.id,
        from: activeColumnId,
        to: overColumnId,
        overType: over.data.current?.type,
      });

      if (!activeColumnId || !overColumnId) {
        console.error("❌ Missing column IDs");
        return;
      }

      // Handle same column reordering
      if (activeColumnId === overColumnId) {
        const columnTasks = tasks[activeColumnId] || [];
        const activeIndex = columnTasks.findIndex(
          (task) => task.id === active.id
        );
        let targetIndex: number;

        if (over.data.current?.type === "column") {
          targetIndex = columnTasks.length - 1;
        } else {
          const overTaskIndex = columnTasks.findIndex(
            (task) => task.id === over.id
          );
          if (overTaskIndex !== -1) {
            targetIndex = overTaskIndex;
          } else {
            targetIndex = columnTasks.length - 1;
          }
        }

        if (
          activeIndex !== targetIndex &&
          activeIndex !== -1 &&
          targetIndex !== -1
        ) {
          console.log(
            `🔄 Reordering task in "${activeColumnId}" from index ${activeIndex} to index ${targetIndex}`
          );

          const result = moveTaskWithArrayMove(
            active.id as string,
            activeColumnId,
            activeIndex,
            targetIndex
          );
          const success = await Promise.resolve(result);

          if (success) {
            console.log(
              `✅ Task reordered successfully to index ${targetIndex}`
            );
          } else {
            console.error(`❌ Failed to reorder task`);
          }
        } else {
          console.log("ℹ️ Task dropped in same position, no reorder needed");
        }
      } else {
        // Handle moving between different columns
        console.log(
          `🔄 Moving task from "${activeColumnId}" to "${overColumnId}"`
        );

        const targetColumnTasks = tasks[overColumnId] || [];
        let targetIndex: number;

        if (
          over.data.current?.type === "column" ||
          targetColumnTasks.length === 0
        ) {
          targetIndex = targetColumnTasks.length;
        } else {
          const overTaskIndex = targetColumnTasks.findIndex(
            (task) => task.id === over.id
          );
          targetIndex =
            overTaskIndex !== -1 ? overTaskIndex : targetColumnTasks.length;
        }

        const result = moveTask(
          active.id as string,
          activeColumnId,
          overColumnId,
          targetIndex
        );
        const success = await Promise.resolve(result);

        if (success) {
          console.log(`✅ Task moved successfully to index ${targetIndex}`);
        } else {
          console.error(`❌ Failed to move task`);
        }
      }
    },
    [tasks, moveTask, moveTaskWithArrayMove]
  );

  return {
    activeTask,
    handleDragStart,
    handleDragEnd,
  };
}

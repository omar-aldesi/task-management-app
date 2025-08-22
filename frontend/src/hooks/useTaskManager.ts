"use client";

import { Column } from "@/types/column";
import {
  IColumnService,
  ILocalStorageService,
  ITaskService,
  ITaskStateManager,
} from "@/types/services";
import { Task } from "@/types/tasks";
import { arrayMove } from "@dnd-kit/sortable";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useTaskManager = (
  taskService: ITaskService,
  localStorageService: ILocalStorageService,
  columnService: IColumnService
): ITaskStateManager => {
  const [tasks, setTasks] = useState<Record<string, Task[]>>({});
  const [columns, setColumns] = useState<Column[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const pathname = usePathname();
  const router = useRouter();

  // Initialize data
  useEffect(() => {
    const initializeData = async () => {
      // Initialize columns
      const savedColumns = localStorageService.loadColumns();
      const defaultColumns = columnService.createDefaultColumns();

      const uniqueColumns = new Map<string, Column>();
      defaultColumns.forEach((col) => uniqueColumns.set(col.id, col));
      savedColumns?.forEach((col) => uniqueColumns.set(col.id, col));

      const finalColumns = Array.from(uniqueColumns.values());
      setColumns(finalColumns);

      // Prepare task state structure
      const initialTasks: Record<string, Task[]> = {};
      finalColumns.forEach((col) => {
        initialTasks[col.id] = [];
      });

      // Fetch and organize tasks
      try {
        const result = await taskService.getAllTasks(1, 100);
        if (result?.tasks) {
          const fetchedGroupedTasks: Record<string, Task[]> = {
            ...initialTasks,
          };

          result.tasks.forEach((task: Task) => {
            const status = task.status || "to do";
            if (fetchedGroupedTasks[status]) {
              fetchedGroupedTasks[status].push(task);
            } else {
              console.warn(
                `Task with status "${task.status}" was dropped as it has no corresponding column.`
              );
            }
          });

          Object.keys(fetchedGroupedTasks).forEach((status) => {
            fetchedGroupedTasks[status].sort(
              (a: Task, b: Task) => a.position - b.position
            );
          });

          setTasks(fetchedGroupedTasks);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch tasks");
      } finally {
        setIsLoading(false);
      }
    };
    if (pathname == "/dashboard") {
      if (localStorage.getItem("token")) {
        initializeData();
      } else {
        alert("⚠ You must log in to access the dashboard.");
        router.push("/login");
      }
    }
  }, [taskService, localStorageService, columnService, pathname, router]);

  // Save columns to localStorage
  useEffect(() => {
    localStorageService.saveColumns(columns);
  }, [columns, localStorageService]);

  const addTask = async (
    title: string,
    status: string,
    description?: string
  ): Promise<boolean> => {
    try {
      const columnTasks = tasks[status] || [];
      const newPosition = columnTasks.length + 1;

      const result = await taskService.createTask(
        title,
        newPosition,
        description,
        status
      );

      if (result?.task) {
        setTasks((prev) => {
          const newData = { ...prev };
          if (!newData[status]) {
            newData[status] = [];
          }

          const existingTaskIndex = newData[status].findIndex(
            (t) => t.id === result.task.id
          );
          if (existingTaskIndex !== -1) {
            console.log("Task already exists, skipping duplicate");
            return newData;
          }

          newData[status].push({ ...result.task, position: newPosition });
          return newData;
        });
        return true;
      }
      return false;
    } catch (err) {
      console.error("❌ Failed to create task:", err);
      return false;
    }
  };

  const updateTask = async (
    id: string,
    updatedFields: Partial<Task>
  ): Promise<Task | undefined> => {
    try {
      const result = await taskService.updateTask(id, updatedFields);
      if (result) {
        setTasks((prev) => {
          let foundTask: Task | null = null;
          let currentStatus = "";

          for (const status of Object.keys(prev)) {
            const task = prev[status].find((t) => t.id === id);
            if (task) {
              foundTask = task;
              currentStatus = status;
              break;
            }
          }

          if (!foundTask) {
            console.error("Task not found for update");
            return prev;
          }

          const newStatus = updatedFields.status;
          if (newStatus && newStatus !== currentStatus) {
            // Handle status change
            const newData: Record<string, Task[]> = {};
            Object.keys(prev).forEach((status) => {
              newData[status] = [];
            });

            if (!newData[newStatus]) {
              newData[newStatus] = [];
            }

            Object.keys(prev).forEach((status) => {
              prev[status].forEach((task) => {
                if (task.id !== id) {
                  newData[status].push(task);
                }
              });
            });

            const updatedTask = {
              ...foundTask,
              ...updatedFields,
              status: newStatus,
            };
            newData[newStatus].push(updatedTask);

            // Renumber positions
            newData[currentStatus].forEach((task, index) => {
              task.position = index + 1;
            });
            newData[newStatus].forEach((task, index) => {
              task.position = index + 1;
            });

            return newData;
          } else {
            // Same column update
            const newData = { ...prev };
            Object.keys(newData).forEach((status) => {
              const taskIndex = newData[status].findIndex((t) => t.id === id);
              if (taskIndex >= 0) {
                newData[status][taskIndex] = {
                  ...newData[status][taskIndex],
                  ...updatedFields,
                };
              }
            });
            return newData;
          }
        });
        return result.task;
      }
    } catch (err) {
      console.error("Failed to update task:", err);
    }
  };

  const deleteTask = async (id: string): Promise<void> => {
    try {
      const result = await taskService.deleteTask(id);
      if (result) {
        setTasks((prev) => {
          const newData = { ...prev };
          Object.keys(newData).forEach((status) => {
            newData[status] = newData[status].filter((t) => t.id !== id);
          });
          return newData;
        });
      }
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  const moveTask = async (
    taskId: string,
    fromStatus: string,
    toStatus: string,
    targetIndex?: number
  ): Promise<boolean> => {
    let taskToMove: Task | null = null;
    let actualFromStatus = fromStatus;

    for (const status of Object.keys(tasks)) {
      const found = tasks[status].find((t) => t.id === taskId);
      if (found) {
        taskToMove = found;
        actualFromStatus = status;
        break;
      }
    }

    if (!taskToMove) {
      console.error("Task not found:", taskId);
      return false;
    }

    const originalState = { ...tasks };

    setTasks((prevTasks) => {
      const newTasks: Record<string, Task[]> = {};
      Object.keys(prevTasks).forEach((status) => {
        newTasks[status] = [...prevTasks[status]];
      });

      if (!newTasks[toStatus]) {
        newTasks[toStatus] = [];
      }

      if (actualFromStatus === toStatus) {
        // Same column reordering
        const columnTasks = [...newTasks[actualFromStatus]];
        const currentIndex = columnTasks.findIndex((t) => t.id === taskId);

        if (currentIndex !== -1 && targetIndex !== undefined) {
          const [removedTask] = columnTasks.splice(currentIndex, 1);
          const safeTargetIndex = Math.max(
            0,
            Math.min(targetIndex, columnTasks.length)
          );
          columnTasks.splice(safeTargetIndex, 0, removedTask);
          newTasks[actualFromStatus] = columnTasks;
        }
      } else {
        // Cross-column move
        newTasks[actualFromStatus] = newTasks[actualFromStatus].filter(
          (t) => t.id !== taskId
        );
        const movedTask = { ...taskToMove!, status: toStatus };

        if (targetIndex !== undefined && targetIndex >= 0) {
          const safeIndex = Math.min(targetIndex, newTasks[toStatus].length);
          newTasks[toStatus].splice(safeIndex, 0, movedTask);
        } else {
          newTasks[toStatus].push(movedTask);
        }
      }

      // Renumber positions
      if (actualFromStatus === toStatus) {
        newTasks[actualFromStatus].forEach((task, index) => {
          task.position = index + 1;
        });
      } else {
        newTasks[actualFromStatus].forEach((task, index) => {
          task.position = index + 1;
        });
        newTasks[toStatus].forEach((task, index) => {
          task.position = index + 1;
        });
      }

      return newTasks;
    });

    try {
      const finalPosition =
        targetIndex !== undefined
          ? targetIndex + 1
          : (tasks[toStatus]?.length || 0) + 1;
      const updateFields = { status: toStatus, position: finalPosition };

      const result = await taskService.updateTask(taskId, updateFields);
      if (!result) {
        console.error("API call failed, reverting state");
        setTasks(originalState);
        return false;
      }
      return true;
    } catch (err) {
      console.error("Failed to move task:", err);
      setTasks(originalState);
      return false;
    }
  };

  const moveTaskWithArrayMove = async (
    taskId: string,
    columnId: string,
    fromIndex: number,
    toIndex: number
  ): Promise<boolean> => {
    const originalState = { ...tasks };

    setTasks((prevTasks) => {
      const newTasks = { ...prevTasks };
      const columnTasks = [...newTasks[columnId]];
      const reorderedTasks = arrayMove(columnTasks, fromIndex, toIndex);

      reorderedTasks.forEach((task, index) => {
        task.position = index + 1;
      });

      newTasks[columnId] = reorderedTasks;
      return newTasks;
    });

    try {
      const movedTask = tasks[columnId][fromIndex];
      if (!movedTask) {
        throw new Error("Task not found");
      }

      const result = await taskService.updateTask(taskId, {
        position: toIndex + 1,
      });
      if (!result) {
        console.error("API call failed, reverting state");
        setTasks(originalState);
        return false;
      }
      return true;
    } catch (err) {
      console.error("Failed to move task:", err);
      setTasks(originalState);
      return false;
    }
  };

  const addNewColumn = (title: string): void => {
    const newColumn = columnService.createNewColumn(title);
    setColumns((prev) => [...prev, newColumn]);
    setTasks((prev) => ({ ...prev, [newColumn.id]: [] }));
  };

  const removeColumn = async (id: string): Promise<void> => {
    if (!columnService.validateColumnId(id)) {
      console.warn(`Cannot remove fixed column with id: ${id}`);
      return;
    }

    setIsLoading(true);
    setColumns((prev) => prev.filter((col) => col.id !== id));

    for (const task of tasks[id] || []) {
      await deleteTask(task.id);
    }
    setIsLoading(false);
  };

  return {
    tasks,
    columns,
    error,
    isLoading,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
    moveTaskWithArrayMove,
    addNewColumn,
    removeColumn,
  };
};

"use client";

import { Task } from "@/types/tasks";
import { createContext } from "react";

export type TasksContextType = {
  tasks: Record<string, Task[]>;
  addTask: (
    title: string,
    status: string,
    description?: string
  ) => boolean | Promise<boolean>;
  updateTask: (id: string, updatedFields: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  moveTask: (
    taskId: string,
    fromStatus: string,
    toStatus: string,
    newPosition?: number
  ) => boolean | Promise<boolean>;
  moveTaskWithArrayMove: (
    taskId: string,
    columnId: string,
    fromIndex: number,
    toIndex: number
  ) => Promise<boolean> | boolean;
};

export const TasksContext = createContext<TasksContextType>({
  tasks: {},
  addTask: () => false,
  updateTask: () => {},
  deleteTask: () => {},
  moveTask: () => false,
  moveTaskWithArrayMove: () => false,
});

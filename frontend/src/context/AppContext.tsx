"use client";

import { Column } from "@/types/column";
import { Task } from "@/types/tasks";
import { createContext } from "react";
export type AppContextType = {
  tasks: Record<string, Task[]>;
  columns: Column[];
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

  error: string | null;
  isLoading: boolean;
  addNewColumn: (title: string) => void;
  removeColumn: (id: string) => void;
};
// Create a context with an initial empty state and placeholder functions
export const AppContext = createContext<AppContextType>({
  tasks: {},
  columns: [],
  addTask: () => false,
  updateTask: () => {},
  deleteTask: () => {},
  moveTask: () => false,
  moveTaskWithArrayMove: () => false,
  error: null,
  isLoading: false,
  addNewColumn: () => {},
  removeColumn: () => {},
});

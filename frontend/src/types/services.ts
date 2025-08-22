import { Column } from "./column";
import { Task } from "./tasks";

export interface ILocalStorageService {
  saveColumns(columns: Column[]): void;
  loadColumns(): Column[] | null;
}

export interface ITaskService {
  createTask(
    title: string,
    position: number,
    description?: string,
    status?: string
  ): Promise<{ task: Task } | null>;
  updateTask(
    id: string,
    updatedFields: Partial<Task>
  ): Promise<{ task: Task } | null>;
  deleteTask(id: string): Promise<boolean>;
  getAllTasks(page: number, limit: number): Promise<{ tasks: Task[] } | null>;
}

export interface IColumnService {
  createDefaultColumns(): Column[];
  createNewColumn(title: string): Column;
  validateColumnId(id: string): boolean;
}

export interface ITaskStateManager {
  tasks: Record<string, Task[]>;
  columns: Column[];
  error: string | null;
  isLoading: boolean;
  addTask: (
    title: string,
    status: string,
    description?: string
  ) => Promise<boolean>;
  updateTask: (
    id: string,
    updatedFields: Partial<Task>
  ) => Promise<Task | undefined>;
  deleteTask: (id: string) => Promise<void>;
  moveTask: (
    taskId: string,
    fromStatus: string,
    toStatus: string,
    targetIndex?: number
  ) => Promise<boolean>;
  moveTaskWithArrayMove: (
    taskId: string,
    columnId: string,
    fromIndex: number,
    toIndex: number
  ) => Promise<boolean>;
  addNewColumn: (title: string) => void;
  removeColumn: (id: string) => Promise<void>;
}

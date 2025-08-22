export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  position: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface TasksResponse {
  tasks: Task[];
  totalTasks: number;
  currentPage: number;
  totalPages: number;
}

export interface CreateTaskRequest {
  title: string;
  description?: string;
  status?: string;
  position?: number;
}

export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  status?: string;
  position?: number;
}

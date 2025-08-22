import { tasks as tasksApi } from "@/lib/api";
import { ITaskService } from "@/types/services";
import { Task } from "@/types/tasks";

export class TaskService implements ITaskService {
  constructor(private apiCall: (fn: () => Promise<any>) => Promise<any>) {}

  async createTask(
    title: string,
    position: number,
    description?: string,
    status?: string
  ): Promise<{ task: Task } | null> {
    return await this.apiCall(() =>
      tasksApi.create(title, position, description, status)
    );
  }

  async updateTask(
    id: string,
    updatedFields: Partial<Task>
  ): Promise<{ task: Task } | null> {
    return await this.apiCall(() => tasksApi.update(id, updatedFields));
  }

  async deleteTask(id: string): Promise<boolean> {
    const result = await this.apiCall(() => tasksApi.delete(id));
    return !!result;
  }

  async getAllTasks(
    page: number,
    limit: number
  ): Promise<{ tasks: Task[] } | null> {
    return await this.apiCall(() => tasksApi.getAll(page, limit));
  }
}

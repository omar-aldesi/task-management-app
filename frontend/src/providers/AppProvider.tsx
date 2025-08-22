"use client";
import { AppContext } from "@/context/AppContext";
import { useApi } from "@/hooks/useApi";
import { useTaskManager } from "@/hooks/useTaskManager";
import { ColumnService } from "@/services/columnService";
import { LocalStorageService } from "@/services/localStorage";
import { TaskService } from "@/services/taskService";
import { PropsWithChildren, useMemo } from "react";

export const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { call } = useApi();

  // Create service instances (following Dependency Injection principle)
  const services = useMemo(
    () => ({
      localStorage: new LocalStorageService(),
      task: new TaskService(call),
      column: new ColumnService(),
    }),
    [call]
  );

  // Use the task manager hook that orchestrates all services
  const taskManager = useTaskManager(
    services.task,
    services.localStorage,
    services.column
  );

  return (
    <AppContext.Provider value={taskManager}>{children}</AppContext.Provider>
  );
};

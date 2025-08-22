"use client";

import { AppContext } from "@/context/AppContext";
import { useColumnManagement } from "@/hooks/useColumnManagement";
import { useDragAndDrop } from "@/hooks/useDragAndDrop";
import { useDragScroll } from "@/hooks/useDragScroll";
import { useTaskModal } from "@/hooks/useTaskModal";
import { useTaskSearch } from "@/hooks/useTaskSearch";
import { Task } from "@/types/tasks";
import {
  closestCenter,
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useCallback, useContext } from "react";
import ErrorState from "../ui/ErrorState";
import LoadingState from "../ui/LoadingState";
import AddColumnSection from "./AddColumnSection";
import DraggableTaskCard from "./DraggableTaskCard";
import DroppableColumn from "./DroppableColumn";
import TaskBoardHeader from "./TaskBoardHeader";
import TaskModal from "./TaskModal";

interface TaskBoardProps {
  searchQuery?: string;
}

export default function TaskBoard({ searchQuery = "" }: TaskBoardProps) {
  const {
    tasks,
    isLoading,
    error,
    moveTask,
    moveTaskWithArrayMove,
    columns,
    addNewColumn,
  } = useContext(AppContext);

  const { scrollRef, dragHandlers } = useDragScroll();

  const { filteredTasks, totalFilteredTasks, totalTasks } = useTaskSearch(
    tasks,
    searchQuery
  );

  const {
    selectedTask,
    isModalOpen,
    createColumnId,
    handleTaskClick,
    handleCreateTask,
    handleCloseModal,
  } = useTaskModal();

  const { activeTask, handleDragStart, handleDragEnd } = useDragAndDrop({
    tasks, // Use original tasks for drag operations
    moveTask,
    moveTaskWithArrayMove,
  });

  const {
    newColumnTitle,
    setNewColumnTitle,
    isAddingColumn,
    setIsAddingColumn,
    handleAddColumn,
    handleAddColumnFromHeader,
    handleCancelAddColumn,
  } = useColumnManagement({ addNewColumn, scrollRef });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  // Memoize handlers to prevent unnecessary re-renders
  const memoizedHandleTaskClick = useCallback(
    (task: Task) => {
      handleTaskClick(task);
    },
    [handleTaskClick]
  );

  const memoizedHandleCreateTask = useCallback(
    (columnId: string) => {
      handleCreateTask(columnId);
    },
    [handleCreateTask]
  );

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  return (
    <div className="h-full flex flex-col">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <TaskBoardHeader
          searchQuery={searchQuery}
          totalFilteredTasks={totalFilteredTasks}
          totalTasks={totalTasks}
          columnsLength={columns.length}
          onAddColumn={handleAddColumnFromHeader}
          onCreateTask={() => handleCreateTask()}
        />

        <div
          ref={scrollRef}
          {...dragHandlers}
          className="flex-1 overflow-x-auto overflow-y-hidden min-h-0 hide-scrollbar cursor-grab"
        >
          <div className="h-full p-6">
            <div className="flex space-x-6 h-full min-w-max">
              {columns.map((column) => (
                <DroppableColumn
                  key={column.id}
                  id={column.id}
                  title={column.title}
                  tasks={filteredTasks[column.id] || []}
                  onTaskClick={memoizedHandleTaskClick}
                  onCreateTask={memoizedHandleCreateTask}
                />
              ))}

              <AddColumnSection
                isAddingColumn={isAddingColumn}
                newColumnTitle={newColumnTitle}
                onTitleChange={setNewColumnTitle}
                onAdd={handleAddColumn}
                onCancel={handleCancelAddColumn}
                onStartAdding={() => setIsAddingColumn(true)}
              />
            </div>
          </div>
        </div>

        <DragOverlay>
          {activeTask ? (
            <div className="rotate-3 scale-105 opacity-90">
              <DraggableTaskCard
                task={activeTask}
                columnId=""
                onTaskClick={memoizedHandleTaskClick}
              />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      <TaskModal
        task={selectedTask}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        defaultColumnId={createColumnId}
      />
    </div>
  );
}

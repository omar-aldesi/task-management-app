"use client";

import { AppContext } from "@/context/AppContext";
import { Task } from "@/types/tasks";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useContext, useEffect, useState } from "react";

interface TaskModalProps {
  task: Task | null; // null for create mode
  isOpen: boolean;
  onClose: () => void;
  defaultColumnId?: string; // for create mode
}

export default function TaskModal({
  task,
  isOpen,
  onClose,
  defaultColumnId,
}: TaskModalProps) {
  const { addTask, updateTask, columns, deleteTask } = useContext(AppContext);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "",
  });
  const [errors, setErrors] = useState<{ title?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const isEditMode = !!task;
  const modalTitle = isEditMode ? "Edit Task" : "Create New Task";
  const saveButtonText = isEditMode ? "Save Changes" : "Create Task";

  // Update form data when task or defaultColumnId changes
  useEffect(() => {
    if (task) {
      // Edit mode
      setFormData({
        title: task.title,
        description: task.description || "",
        status: task.status,
      });
    } else if (defaultColumnId) {
      // Create mode
      setFormData({
        title: "",
        description: "",
        status: defaultColumnId,
      });
    }
    setErrors({});
  }, [task, defaultColumnId]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = () => {
    const newErrors: { title?: string } = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleTaskDelete = async () => {
    setIsLoading(true);
    await deleteTask(task!.id);
    setIsLoading(false);
    onClose();
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      if (isEditMode && task) {
        // Edit existing task
        const updatedFields = {
          title: formData.title.trim(),
          description: formData.description.trim(),
          status: formData.status,
        };

        await updateTask(task.id, updatedFields);
        onClose();
      } else {
        // Create new task
        const success = await addTask(
          formData.title.trim(),
          formData.status,
          formData.description.trim() || undefined
        );
        if (success) {
          onClose();
        }
      }
    } catch (error) {
      console.error("Failed to save task:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    } else if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      handleSave();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />

        {/* Modal */}
        <div
          className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 w-full max-w-md p-6"
          onKeyDown={handleKeyDown}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              {modalTitle}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
            >
              <XMarkIcon className="w-5 h-5 text-slate-500" />
            </button>
          </div>

          {/* Form */}
          <div className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  errors.title
                    ? "border-red-500"
                    : "border-slate-300 dark:border-slate-600"
                }`}
                placeholder="Enter task title..."
                autoFocus
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                placeholder="Enter task description..."
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                {columns.map((column) => (
                  <option key={column.id} value={column.id}>
                    {column.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            {isEditMode && (
              <button
                onClick={handleTaskDelete}
                disabled={isLoading}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 disabled:bg-red-300 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors flex items-center space-x-2"
              >
                Delete task
              </button>
            )}

            <button
              onClick={handleSave}
              disabled={isLoading || !formData.title.trim()}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors flex items-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                  <span>{isEditMode ? "Saving..." : "Creating..."}</span>
                </>
              ) : (
                <span>{saveButtonText}</span>
              )}
            </button>
          </div>

          {/* Keyboard shortcuts hint */}
          <div className="mt-4 text-xs text-slate-500 dark:text-slate-400 text-center">
            Press{" "}
            <kbd className="px-1 py-0.5 bg-slate-100 dark:bg-slate-700 rounded text-xs">
              Esc
            </kbd>{" "}
            to close,
            <kbd className="px-1 py-0.5 bg-slate-100 dark:bg-slate-700 rounded text-xs mx-1">
              Cmd+Enter
            </kbd>{" "}
            to save
          </div>
        </div>
      </div>
    </div>
  );
}

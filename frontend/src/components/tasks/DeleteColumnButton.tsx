"use client";

import { AppContext } from "@/context/AppContext";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useContext, useState } from "react";
import { createPortal } from "react-dom";

interface DeleteColumnButtonProps {
  columnId: string;
  columnTitle: string;
  taskCount: number;
}

export default function DeleteColumnButton({
  columnId,
  columnTitle,
  taskCount,
}: DeleteColumnButtonProps) {
  const { removeColumn } = useContext(AppContext);
  const [showModal, setShowModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowModal(true);
  };

  const confirmDeleteColumn = async () => {
    setIsDeleting(true);
    try {
      await removeColumn(columnId);
      // The component will unmount, so no need to close the modal
    } catch (error) {
      console.error("Failed to delete column:", error);
      setIsDeleting(false);
      // Stay on the modal to show an error state if needed
    }
  };

  const cancelDelete = () => {
    if (!isDeleting) {
      setShowModal(false);
    }
  };

  const isBuiltInColumn = ["to do", "in progress", "done"].includes(columnId);

  if (isBuiltInColumn) {
    return null; // Don't render the delete button for default columns
  }

  const Modal = () => {
    if (!showModal) return null;

    return createPortal(
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex justify-center items-center p-4"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9999,
        }}
      >
        <div
          className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-2xl w-full max-w-sm border border-slate-200 dark:border-slate-700 relative z-[10000]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mr-3">
              <TrashIcon className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Delete Column
            </h3>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
            Are you sure you want to delete the <strong>{columnTitle}</strong>{" "}
            column?
            {taskCount > 0 && (
              <span className="text-red-600 dark:text-red-400 font-medium">
                {" "}
                All {taskCount} task{taskCount !== 1 ? "s" : ""} in this column
                will be permanently deleted.
              </span>
            )}
          </p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={cancelDelete}
              disabled={isDeleting}
              className="px-4 py-2 text-sm font-medium rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              onClick={confirmDeleteColumn}
              disabled={isDeleting}
              className="px-4 py-2 text-sm font-medium rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isDeleting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                  <span>Deleting...</span>
                </>
              ) : (
                <span>Delete Column</span>
              )}
            </button>
          </div>
        </div>
      </div>,
      document.body
    );
  };

  return (
    <>
      <button
        onClick={handleDeleteClick}
        disabled={isDeleting}
        className="p-2 hover:bg-red-500/10 text-red-500 rounded-lg transition-colors opacity-60 hover:opacity-100 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <TrashIcon className="w-4 h-4" />
      </button>

      <Modal />
    </>
  );
}

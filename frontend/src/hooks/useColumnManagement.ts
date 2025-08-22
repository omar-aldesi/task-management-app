import { useState } from "react";

interface UseColumnManagementProps {
  addNewColumn: (title: string) => void;
  scrollRef: React.RefObject<HTMLDivElement | null>; // Fixed: Accept nullable ref
}

export function useColumnManagement({
  addNewColumn,
  scrollRef,
}: UseColumnManagementProps) {
  const [newColumnTitle, setNewColumnTitle] = useState("");
  const [isAddingColumn, setIsAddingColumn] = useState(false);

  const handleAddColumn = () => {
    if (newColumnTitle.trim()) {
      addNewColumn(newColumnTitle.trim());
      setNewColumnTitle("");
      setIsAddingColumn(false);
    }
  };

  const handleAddColumnFromHeader = () => {
    setIsAddingColumn(true);
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({
          left: scrollRef.current.scrollWidth,
          behavior: "smooth",
        });
      }
    }, 100);
  };

  const handleCancelAddColumn = () => {
    setIsAddingColumn(false);
    setNewColumnTitle("");
  };

  return {
    newColumnTitle,
    setNewColumnTitle,
    isAddingColumn,
    setIsAddingColumn,
    handleAddColumn,
    handleAddColumnFromHeader,
    handleCancelAddColumn,
  };
}

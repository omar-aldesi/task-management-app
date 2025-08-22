import { PlusIcon } from "@heroicons/react/24/outline";

interface AddColumnSectionProps {
  isAddingColumn: boolean;
  newColumnTitle: string;
  onTitleChange: (title: string) => void;
  onAdd: () => void;
  onCancel: () => void;
  onStartAdding: () => void;
}

export default function AddColumnSection({
  isAddingColumn,
  newColumnTitle,
  onTitleChange,
  onAdd,
  onCancel,
  onStartAdding,
}: AddColumnSectionProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") onAdd();
    if (e.key === "Escape") onCancel();
  };

  if (!isAddingColumn) {
    return (
      <div className="flex-shrink-0 w-80 h-full">
        <button
          onClick={onStartAdding}
          className="p-5 w-full h-full border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-2xl hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-all duration-200 flex flex-col items-center justify-center group"
        >
          <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/20 rounded-xl flex items-center justify-center mb-3 transition-colors">
            <PlusIcon className="w-6 h-6 text-slate-400 group-hover:text-blue-500 transition-colors" />
          </div>
          <span className="text-sm font-medium text-slate-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            Add Column
          </span>
        </button>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-6 flex flex-col justify-center">
      <input
        type="text"
        placeholder="Enter column title..."
        value={newColumnTitle}
        onChange={(e) => onTitleChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm font-medium"
        autoFocus
      />
      <div className="flex space-x-2 mt-4">
        <button
          onClick={onAdd}
          className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors"
        >
          Add
        </button>
        <button
          onClick={onCancel}
          className="flex-1 px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-lg transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

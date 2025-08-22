interface BoardStatsProps {
  searchQuery: string;
  totalFilteredTasks: number;
  totalTasks: number;
  columnsLength: number;
}

export default function BoardStats({
  searchQuery,
  totalFilteredTasks,
  totalTasks,
  columnsLength,
}: BoardStatsProps) {
  return (
    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
      {searchQuery ? (
        <>
          {totalFilteredTasks} of {totalTasks} tasks match {searchQuery}
        </>
      ) : (
        `${totalTasks} tasks across ${columnsLength} columns`
      )}
    </p>
  );
}

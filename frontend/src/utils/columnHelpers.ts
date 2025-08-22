export const getColumnStyle = (columnId: string) => {
  const styles = {
    "to do": {
      header:
        "bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20",
      headerText: "text-blue-700 dark:text-blue-300",
      count: "bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200",
      border: "border-blue-200 dark:border-blue-800",
      accent: "border-l-blue-400",
    },
    "in progress": {
      header:
        "bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20",
      headerText: "text-amber-700 dark:text-amber-300",
      count:
        "bg-amber-200 dark:bg-amber-800 text-amber-800 dark:text-amber-200",
      border: "border-amber-200 dark:border-amber-800",
      accent: "border-l-amber-400",
    },
    done: {
      header:
        "bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20",
      headerText: "text-emerald-700 dark:text-emerald-300",
      count:
        "bg-emerald-200 dark:bg-emerald-800 text-emerald-800 dark:text-emerald-200",
      border: "border-emerald-200 dark:border-emerald-800",
      accent: "border-l-emerald-400",
    },
    custom: {
      header:
        "bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700/50 dark:to-slate-800/50",
      headerText: "text-slate-600 dark:text-slate-300",
      count:
        "bg-slate-200/80 dark:bg-slate-600/80 text-slate-700 dark:text-slate-200 backdrop-blur-sm",
      border: "border-slate-300/60 dark:border-slate-600/60",
      accent: "border-l-slate-400/60",
    },
  };
  return styles[columnId as keyof typeof styles] || styles.custom;
};

"use client";

import { Column } from "@/types/column";
import { createContext } from "react";

export type ColumnsContextType = {
  columns: Column[];
  addNewColumn: (title: string) => void;
  removeColumn: (id: string) => void;
};

export const ColumnsContext = createContext<ColumnsContextType>({
  columns: [],
  addNewColumn: () => {},
  removeColumn: () => {},
});

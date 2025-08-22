"use client";

import { createContext } from "react";

export type AppStateContextType = {
  error: string | null;
  isLoading: boolean;
};

export const AppStateContext = createContext<AppStateContextType>({
  error: null,
  isLoading: false,
});

import { Column } from "@/types/column";
import { ILocalStorageService } from "@/types/services";

const LOCAL_STORAGE_KEY = "columns";

export class LocalStorageService implements ILocalStorageService {
  saveColumns(columns: Column[]): void {
    if (columns.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(columns));
    }
  }

  loadColumns(): Column[] | null {
    const savedColumns = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedColumns) {
      try {
        return JSON.parse(savedColumns);
      } catch (e) {
        console.error("Failed to parse columns from local storage", e);
        return null;
      }
    }
    return null;
  }
}

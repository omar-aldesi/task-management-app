import { Column } from "@/types/column";
import { IColumnService } from "@/types/services";

export class ColumnService implements IColumnService {
  private readonly fixedColumns = ["to do", "in progress", "done"];

  createDefaultColumns(): Column[] {
    return [
      { id: "to do", title: "Todo" },
      { id: "in progress", title: "In Progress" },
      { id: "done", title: "Done" },
    ];
  }

  createNewColumn(title: string): Column {
    return {
      id: title
        .toLowerCase()
        .replace(/\s/g, "-")
        .concat("-", Date.now().toString()),
      title: title,
    };
  }

  validateColumnId(id: string): boolean {
    return !this.fixedColumns.includes(id);
  }
}

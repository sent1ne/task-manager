import { useMemo } from "react";
import { useTasks } from "./useTasks";
import { HistoryEntry } from "../types/task";

interface HistoryItemWithTask extends HistoryEntry {
  taskId: string;
  taskTitle: string;
}

export function useHistory() {
  const { tasks } = useTasks();

  const allHistory = useMemo(() => {
    const items: HistoryItemWithTask[] = [];

    tasks.forEach((task) => {
      task.history.forEach((entry) => {
        items.push({
          ...entry,
          taskId: task.id,
          taskTitle: task.title,
        });
      });
    });

    items.sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    );

    return items;
  }, [tasks]);

  return { allHistory };
}

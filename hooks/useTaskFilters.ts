import { useState, useMemo } from "react";
import { Task } from "../types/task";

export type SortOption = "created" | "dueDate" | "status";

interface UseTaskFiltersReturn {
  sortBy: SortOption;
  setSortBy: (option: SortOption) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: string | null;
  setStatusFilter: (status: string | null) => void;
  filteredAndSortedTasks: Task[];
}

const STATUS_ORDER: Record<string, number> = {
  New: 0,
  "In Progress": 1,
  Completed: 2,
  Cancelled: 3,
};

export function useTaskFilters(tasks: Task[]): UseTaskFiltersReturn {
  const [sortBy, setSortBy] = useState<SortOption>("created");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const filteredAndSortedTasks = useMemo(() => {
    let result = [...tasks];

    // Search by title
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (task) =>
          task.title.toLowerCase().includes(query) ||
          task.location.address.toLowerCase().includes(query),
      );
    }

    if (statusFilter) {
      result = result.filter((task) => task.status === statusFilter);
    }

    switch (sortBy) {
      case "created":
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        break;
      case "dueDate":
        result.sort(
          (a, b) =>
            new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
        );
        break;
      case "status":
        result.sort(
          (a, b) =>
            (STATUS_ORDER[a.status] ?? 99) - (STATUS_ORDER[b.status] ?? 99),
        );
        break;
    }

    return result;
  }, [tasks, sortBy, searchQuery, statusFilter]);

  return {
    sortBy,
    setSortBy,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    filteredAndSortedTasks,
  };
}

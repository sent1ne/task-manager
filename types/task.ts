export type TaskStatus = "New" | "In Progress" | "Completed" | "Cancelled";
export type SyncStatus = "Synced" | "Pending Sync" | "Sync Failed";

export interface Attachment {
  id: string;
  uri: string;
  type: "image" | "pdf" | "other";
  name: string;
}

export interface TaskLocation {
  address: string;
  latitude?: number;
  longitude?: number;
}

export interface HistoryEntry {
  id: string;
  timestamp: string;
  action: string;
  description: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  location: TaskLocation;
  status: TaskStatus;
  attachments: Attachment[];
  history: HistoryEntry[];
  syncStatus: SyncStatus;
  createdAt: string;
  updatedAt: string;
}

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Task, TaskStatus, SyncStatus, HistoryEntry } from "../types/task";
import * as taskStorage from "../storage/taskStorage";
import { generateId, nowISO } from "../utils/helpers";

interface TaskContextType {
    tasks: Task[];
    loading: boolean;
    addTask: (taskData: Omit<Task, "id" | "createdAt" | "updatedAt" | "history" | "syncStatus">) => Promise<void>;
    updateTask: (taskId: string, updates: Partial<Task>) => Promise<void>;
    removeTask: (taskId: string) => Promise<void>;
    getTask: (taskId: string) => Task | undefined;
    updateStatus: (taskId: string, newStatus: TaskStatus) => Promise<void>;
}

const TaskContext = createContext<TaskContextType | null>(null);

export function TaskProvider({ children }: { children: ReactNode }) {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        const savedTasks = await taskStorage.getTasks();
        setTasks(savedTasks);
        setLoading(false);
    };

    const addTask = async (taskData: Omit<Task, "id" | "createdAt" | "updatedAt" | "history" | "syncStatus">) => {
        const now = nowISO();
        const newTask: Task = {
            ...taskData,
            id: generateId(),
            createdAt: now,
            updatedAt: now,
            syncStatus: "Pending Sync",
            history: [
                {
                    id: generateId(),
                    timestamp: now,
                    action: "created",
                    description: "Task created",
                },
            ],
        };

        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        await taskStorage.saveTasks(updatedTasks);
    };

    const updateTask = async (taskId: string, updates: Partial<Task>) => {
        const updatedTasks = tasks.map((task) => {
            if (task.id === taskId) {
                return {
                    ...task,
                    ...updates,
                    updatedAt: nowISO(),
                    syncStatus: "Pending Sync" as SyncStatus,
                };
            }
            return task;
        });
        setTasks(updatedTasks);
        await taskStorage.saveTasks(updatedTasks);
    };

    const removeTask = async (taskId: string) => {
        const updatedTasks = tasks.filter((t) => t.id !== taskId);
        setTasks(updatedTasks);
        await taskStorage.saveTasks(updatedTasks);
    };

    const getTask = (taskId: string) => {
        return tasks.find((t) => t.id === taskId);
    };

    const updateStatus = async (taskId: string, newStatus: TaskStatus) => {
        const statusLabels: Record<TaskStatus, string> = {
            New: "New",
            "In Progress": "In Progress",
            Completed: "Completed",
            Cancelled: "Cancelled",
        };

        const historyEntry: HistoryEntry = {
            id: generateId(),
            timestamp: nowISO(),
            action: "status_changed",
            description: `Status changed to "${statusLabels[newStatus]}"`,
        };

        const updatedTasks = tasks.map((task) => {
            if (task.id === taskId) {
                return {
                    ...task,
                    status: newStatus,
                    updatedAt: nowISO(),
                    syncStatus: "Pending Sync" as SyncStatus,
                    history: [...task.history, historyEntry],
                };
            }
            return task;
        });

        setTasks(updatedTasks);
        await taskStorage.saveTasks(updatedTasks);
    };

    return (
        <TaskContext.Provider value={{ tasks, loading, addTask, updateTask, removeTask, getTask, updateStatus }}>
            {children}
        </TaskContext.Provider>
    );
}

export function useTasks() {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error("useTasks must be used within TaskProvider");
    }
    return context;
}
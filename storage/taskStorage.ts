import AsyncStorage from "@react-native-async-storage/async-storage";
import { Task } from "../types/task";

const TASKS_KEY = "@field_tasks";

export async function getTasks(): Promise<Task[]> {
  try {
    const json = await AsyncStorage.getItem(TASKS_KEY);
    return json ? JSON.parse(json) : [];
  } catch (error) {
    console.error("Error loading tasks:", error);
    return [];
  }
}

export async function saveTasks(tasks: Task[]): Promise<void> {
  try {
    await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error("Error saving tasks:", error);
  }
}

export async function getTaskById(taskId: string): Promise<Task | undefined> {
  const tasks = await getTasks();
  return tasks.find((t) => t.id === taskId);
}

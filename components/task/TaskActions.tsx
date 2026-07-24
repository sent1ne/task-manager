import { View, Text, TouchableOpacity } from "react-native";
import { useTheme, useThemeColors } from "../../hooks/useTheme";
import { Task, TaskStatus } from "../../types/task";

interface TaskActionsProps {
    task: Task;
    onEdit: () => void;
    onStatusChange: (newStatus: TaskStatus) => void;
    onDelete: () => void;
}

export default function TaskActions({ task, onEdit, onStatusChange, onDelete }: TaskActionsProps) {
    const { isDark } = useTheme();
    const { border } = useThemeColors();

    const nextStatus: TaskStatus | null =
        task.status === "New" ? "In Progress" : task.status === "In Progress" ? "Completed" : null;

    return (
        <View className="p-4 space-y-3 mb-8">
            <TouchableOpacity
                className={`p-4 rounded-xl items-center border ${border} ${isDark ? "active:bg-zinc-700" : "active:bg-zinc-100"}`}
                onPress={onEdit}
            >
                <Text className={`font-semibold ${isDark ? "text-zinc-300" : "text-zinc-700"}`}>Edit Task</Text>
            </TouchableOpacity>

            {nextStatus && (
                <TouchableOpacity
                    className="bg-blue-500 p-4 rounded-xl items-center active:bg-blue-600"
                    onPress={() => onStatusChange(nextStatus)}
                >
                    <Text className="text-white font-semibold">Mark as {nextStatus}</Text>
                </TouchableOpacity>
            )}

            {task.status === "In Progress" && (
                <TouchableOpacity
                    className="bg-red-500 p-4 rounded-xl items-center active:bg-red-600"
                    onPress={() => onStatusChange("Cancelled")}
                >
                    <Text className="text-white font-semibold">Cancel Task</Text>
                </TouchableOpacity>
            )}

            <TouchableOpacity
                className={`p-4 rounded-xl items-center border ${isDark ? "border-red-500 active:bg-red-900/20" : "border-red-300 active:bg-red-50"}`}
                onPress={onDelete}
            >
                <Text className="text-red-500 font-semibold">Delete Task</Text>
            </TouchableOpacity>
        </View>
    );
}
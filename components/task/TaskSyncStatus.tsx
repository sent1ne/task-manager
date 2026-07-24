import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColors } from "../../hooks/useTheme";
import { Task } from "../../types/task";

interface TaskSyncStatusProps {
    task: Task;
}

export default function TaskSyncStatus({ task }: TaskSyncStatusProps) {
    const { bgCard } = useThemeColors();

    return (
        <View className={`mt-3 p-4 ${bgCard}`}>
            {task.syncStatus === "Synced" && (
                <View className="flex-row items-center">
                    <Ionicons name="cloud-done-outline" size={20} color="#22C55E" />
                    <Text className="ml-2 text-green-600">Synced</Text>
                </View>
            )}
            {task.syncStatus === "Pending Sync" && (
                <View className="flex-row items-center">
                    <Ionicons name="cloud-offline-outline" size={20} color="#F59E0B" />
                    <Text className="ml-2 text-yellow-600">Pending sync</Text>
                </View>
            )}
            {task.syncStatus === "Sync Failed" && (
                <View className="flex-row items-center">
                    <Ionicons name="cloud-offline-outline" size={20} color="#EF4444" />
                    <Text className="ml-2 text-red-500">Sync failed</Text>
                </View>
            )}
        </View>
    );
}
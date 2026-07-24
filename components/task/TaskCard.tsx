import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import StatusBadge from "../ui/StatusBadge";
import { Task } from "../../types/task";
import { formatDate } from "../../utils/helpers";
import { useTheme } from "../../hooks/useTheme";

interface TaskCardProps {
    task: Task;
    onPress: () => void;
}

export default function TaskCard({ task, onPress }: TaskCardProps) {
    const { isDark } = useTheme();

    return (
        <TouchableOpacity
            className={`p-4 mb-3 rounded-2xl border shadow-sm active:opacity-80 ${isDark ? "bg-zinc-800 border-zinc-700" : "bg-white border-zinc-200"
                }`}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <View className="flex-row justify-between items-start mb-2">
                <Text
                    className={`text-lg font-semibold flex-1 mr-3 ${isDark ? "text-white" : "text-zinc-900"}`}
                    numberOfLines={2}
                >
                    {task.title}
                </Text>
                <StatusBadge status={task.status} />
            </View>

            <View className="flex-row items-center mb-1">
                <Ionicons name="location-outline" size={16} color={isDark ? "#A1A1AA" : "#71717A"} />
                <Text
                    className={`ml-1.5 text-sm flex-1 ${isDark ? "text-zinc-400" : "text-zinc-500"}`}
                    numberOfLines={1}
                >
                    {task.location.address}
                </Text>
            </View>

            <View className="flex-row items-center">
                <Ionicons name="calendar-outline" size={16} color={isDark ? "#A1A1AA" : "#71717A"} />
                <Text className={`ml-1.5 text-sm ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>
                    {formatDate(task.dueDate)}
                </Text>
            </View>

            {task.syncStatus === "Pending Sync" && (
                <View className="mt-2 flex-row items-center">
                    <Ionicons name="cloud-offline-outline" size={14} color="#F59E0B" />
                    <Text className="ml-1 text-yellow-600 text-xs">Pending sync</Text>
                </View>
            )}
        </TouchableOpacity>
    );
}
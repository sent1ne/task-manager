import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColors } from "../../hooks/useTheme";
import { formatDate } from "../../utils/helpers";
import { Task } from "../../types/task";
import StatusBadge from "../ui/StatusBadge";

interface TaskInfoSectionProps {
    task: Task;
}

export default function TaskInfoSection({ task }: TaskInfoSectionProps) {
    const { bgCard, border, textPrimary, textSecondary, textMuted, iconColor } = useThemeColors();

    return (
        <>
            <View className={`p-4 border-b ${border} ${bgCard}`}>
                <View className="flex-row justify-between items-start mb-3">
                    <Text className={`text-2xl font-bold flex-1 mr-3 ${textPrimary}`}>{task.title}</Text>
                    <StatusBadge status={task.status} />
                </View>
                <Text className={`text-base leading-6 ${textSecondary}`}>{task.description}</Text>
            </View>

            <View className={`mt-3 p-4 ${bgCard}`}>
                <View className="flex-row items-center mb-3">
                    <Ionicons name="location-outline" size={20} color={iconColor} />
                    <Text className={`ml-2 text-base flex-1 ${textMuted}`}>{task.location.address}</Text>
                </View>
                <View className="flex-row items-center mb-3">
                    <Ionicons name="calendar-outline" size={20} color={iconColor} />
                    <Text className={`ml-2 text-base ${textMuted}`}>Due: {formatDate(task.dueDate)}</Text>
                </View>
                <View className="flex-row items-center">
                    <Ionicons name="time-outline" size={20} color={iconColor} />
                    <Text className={`ml-2 text-base ${textMuted}`}>Created: {formatDate(task.createdAt)}</Text>
                </View>
            </View>
        </>
    );
}
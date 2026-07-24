import { View, Text } from "react-native";
import { useThemeColors } from "../../hooks/useTheme";
import { Task } from "../../types/task";
import HistoryItem from "../HistoryItem";

interface TaskHistoryProps {
    task: Task;
}

export default function TaskHistory({ task }: TaskHistoryProps) {
    const { bgCard, textPrimary } = useThemeColors();

    if (task.history.length === 0) return null;

    return (
        <View className={`mt-3 p-4 ${bgCard}`}>
            <Text className={`text-lg font-semibold mb-4 ${textPrimary}`}>Task History</Text>
            {task.history.slice().reverse().map((entry) => (
                <HistoryItem key={entry.id} entry={entry} />
            ))}
        </View>
    );
}
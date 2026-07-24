import { View, Text, FlatList } from "react-native";
import { useHistory } from "../hooks/useHistory";
import { useTheme, useThemeColors } from "../hooks/useTheme";
import HistoryItem from "../components/HistoryItem";
import EmptyState from "../components/ui/EmptyState";
import ScreenHeader from "../components/ui/ScreenHeader";

export default function HistoryScreen() {
    const { isDark } = useTheme();
    const { bgScreen, bgCard, border } = useThemeColors();
    const { allHistory } = useHistory();


    return (
        <View className={`flex-1 ${bgScreen}`}>
            <ScreenHeader
                title="History"
                subtitle={`${allHistory.length} ${allHistory.length === 1 ? "action" : "actions"}`}
            />

            <FlatList
                data={allHistory}
                keyExtractor={(item) => item.id}
                className="px-4 pt-4"
                contentContainerStyle={{ paddingBottom: 40 }}
                ListEmptyComponent={
                    <EmptyState
                        icon="time-outline"
                        title="No history yet"
                        subtitle="Actions will appear here when you create or modify tasks"
                    />
                }
                renderItem={({ item }) => (
                    <View className={`p-4 mb-3 rounded-2xl border ${bgCard} ${border}`}>
                        <Text className={`text-xs font-medium mb-2 ${isDark ? "text-zinc-500" : "text-zinc-400"}`}>
                            Task: {item.taskTitle}
                        </Text>
                        <HistoryItem entry={item} />
                    </View>
                )}
            />
        </View>
    );
}
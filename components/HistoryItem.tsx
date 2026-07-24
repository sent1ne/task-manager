import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { HistoryEntry } from "../types/task";
import { formatDate } from "../utils/helpers";
import { useTheme } from "../hooks/useTheme";

interface HistoryItemProps {
    entry: HistoryEntry;
}

const ACTION_ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
    created: "add-circle-outline",
    edited: "create-outline",
    status_changed: "swap-horizontal-outline",
    attachment_added: "attach-outline",
    deleted: "trash-outline",
    synced: "cloud-done-outline",
};

const ACTION_COLORS: Record<string, string> = {
    created: "#3B82F6",
    edited: "#F97316",
    status_changed: "#A855F7",
    attachment_added: "#22C55E",
    deleted: "#EF4444",
    synced: "#14B8A6",
};

export default function HistoryItem({ entry }: HistoryItemProps) {
    const { isDark } = useTheme();
    const iconName = ACTION_ICONS[entry.action] || "ellipse-outline";
    const color = ACTION_COLORS[entry.action] || "#A1A1AA";

    return (
        <View className="flex-row items-start mb-4 last:mb-0">
            <View className={`w-8 h-8 rounded-full items-center justify-center mr-3 ${isDark ? "bg-zinc-700" : "bg-zinc-100"}`}>
                <Ionicons name={iconName} size={18} color={color} />
            </View>
            <View className="flex-1">
                <Text className={`text-sm font-medium ${isDark ? "text-zinc-300" : "text-zinc-800"}`}>
                    {entry.description}
                </Text>
                <Text className={`text-xs mt-1 ${isDark ? "text-zinc-500" : "text-zinc-400"}`}>
                    {formatDate(entry.timestamp)}
                </Text>
            </View>
        </View>
    );
}
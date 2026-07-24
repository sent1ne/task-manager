import { View, Text } from "react-native";
import { useTheme } from "../../hooks/useTheme";

const STATUS_STYLES: Record<string, { light: { bg: string; text: string }; dark: { bg: string; text: string } }> = {
    New: {
        light: { bg: "bg-blue-100", text: "text-blue-800" },
        dark: { bg: "bg-blue-900/30", text: "text-blue-400" },
    },
    "In Progress": {
        light: { bg: "bg-yellow-100", text: "text-yellow-800" },
        dark: { bg: "bg-yellow-900/30", text: "text-yellow-400" },
    },
    Completed: {
        light: { bg: "bg-green-100", text: "text-green-800" },
        dark: { bg: "bg-green-900/30", text: "text-green-400" },
    },
    Cancelled: {
        light: { bg: "bg-red-100", text: "text-red-800" },
        dark: { bg: "bg-red-900/30", text: "text-red-400" },
    },
};

const DEFAULT_STYLE = {
    light: { bg: "bg-zinc-100", text: "text-zinc-800" },
    dark: { bg: "bg-zinc-800", text: "text-zinc-400" },
};

interface StatusBadgeProps {
    status: string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
    const { isDark } = useTheme();
    const colors = STATUS_STYLES[status] || DEFAULT_STYLE;
    const style = isDark ? colors.dark : colors.light;

    return (
        <View className={`px-3 py-1 rounded-lg border-dashed ${style.bg}`}>
            <Text className={`text-xs font-semibold ${style.text}`}>{status}</Text>
        </View>
    );
}
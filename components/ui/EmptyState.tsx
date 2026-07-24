import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../hooks/useTheme";

interface EmptyStateProps {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    subtitle?: string;
}

export default function EmptyState({ icon, title, subtitle }: EmptyStateProps) {
    const { isDark } = useTheme();

    return (
        <View className="items-center justify-center py-20 px-4">
            <Ionicons name={icon} size={80} color={isDark ? "#52525B" : "#D4D4D8"} />
            <Text className={`mt-4 text-xl font-medium ${isDark ? "text-zinc-500" : "text-zinc-400"}`}>
                {title}
            </Text>
            {subtitle && (
                <Text className={`text-sm mt-1 text-center ${isDark ? "text-zinc-600" : "text-zinc-400"}`}>
                    {subtitle}
                </Text>
            )}
        </View>
    );
}
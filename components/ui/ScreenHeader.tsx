import { View, Text } from "react-native";
import { useTheme } from "../../hooks/useTheme";

interface ScreenHeaderProps {
    title: string;
    subtitle?: string;
}

export default function ScreenHeader({ title, subtitle }: ScreenHeaderProps) {
    const { isDark } = useTheme();

    return (
        <View
            className={`pt-14 pb-4 px-4 border-b ${isDark ? "bg-zinc-800 border-zinc-700" : "bg-white border-zinc-200"
                }`}
        >
            <Text className={`text-3xl font-bold ${isDark ? "text-white" : "text-zinc-900"}`}>
                {title}
            </Text>
            <Text className={`text-sm mt-1 h-5 ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>
                {subtitle || " "}
            </Text>
        </View>
    );
}
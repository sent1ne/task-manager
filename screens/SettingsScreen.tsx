import { View, Text, Switch } from "react-native";
import { useTheme, useThemeColors } from "../hooks/useTheme";
import ScreenHeader from "../components/ui/ScreenHeader";

export default function SettingsScreen() {
    const { isDark, toggleTheme } = useTheme();
    const { bgScreen, bgCard, border } = useThemeColors();

    return (
        <View className={`flex-1 ${bgScreen}`}>
            <ScreenHeader title="Settings" subtitle="App preferences" />

            <View className="px-4 mt-4">
                <View className={`flex-row items-center justify-between py-4 border-b ${border}`}>
                    <View>
                        <Text className={`text-lg ${isDark ? "text-white" : "text-zinc-900"}`}>Dark Mode</Text>
                        <Text className={`text-sm ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>
                            {isDark ? "Dark theme enabled" : "Light theme enabled"}
                        </Text>
                    </View>
                    <Switch
                        value={isDark}
                        onValueChange={toggleTheme}
                        trackColor={{ false: "#D4D4D8", true: "#93C5FD" }}
                        thumbColor={isDark ? "#3B82F6" : "#FAFAFA"}
                    />
                </View>

                <View className={`mt-8 p-4 rounded-xl ${bgCard}`}>
                    <Text className={`text-md text-center  ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>
                        AN-MA-7459
                    </Text>
                </View>
            </View>
        </View>
    );
}
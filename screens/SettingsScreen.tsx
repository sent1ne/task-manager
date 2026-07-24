import { View, Text, Switch } from "react-native";
import { useState } from "react";

export default function SettingsScreen() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    return (
        <View className="flex-1 bg-white px-4 pt-14">
            <Text className="text-3xl font-bold text-gray-900 mb-6">Settings</Text>

            <View className="flex-row items-center justify-between py-4 border-b border-gray-200">
                <View>
                    <Text className="text-lg text-gray-900">Dark Mode</Text>
                    <Text className="text-sm text-gray-500">Toggle appearance</Text>
                </View>
                <Switch
                    value={isDarkMode}
                    onValueChange={setIsDarkMode}
                    trackColor={{ false: "#D1D5DB", true: "#93C5FD" }}
                    thumbColor={isDarkMode ? "#3B82F6" : "#F9FAFB"}
                />
            </View>

            <View className="mt-8 p-4 bg-gray-50 rounded-xl">
                <Text className="text-gray-500 text-sm text-center">
                    Task Manager v1.0.0
                </Text>
            </View>

            <View className="mt-auto pb-10 items-center">
                <Text className="text-gray-900 text-md font-bold">
                    AN-MA-7459
                </Text>
            </View>
        </View>
    );
}
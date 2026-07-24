import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function HistoryScreen() {
    return (
        <View className="flex-1 bg-white items-center justify-center">
            <Ionicons name="time-outline" size={80} color="#D1D5DB" />
            <Text className="mt-4 text-gray-400 text-xl">History</Text>
            <Text className="text-gray-400 text-sm">Action log will appear here</Text>
        </View>
    );
}
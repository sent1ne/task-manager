import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function MapScreen() {
    return (
        <View className="flex-1 bg-white items-center justify-center">
            <Ionicons name="map-outline" size={80} color="#D1D5DB" />
            <Text className="mt-4 text-gray-400 text-xl">Map</Text>
            <Text className="text-gray-400 text-sm">Task markers will appear here</Text>
        </View>
    );
}
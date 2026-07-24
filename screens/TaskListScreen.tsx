import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
    navigation: any;
}

export default function TaskListScreen({ navigation }: Props) {
    return (
        <View className="flex-1 bg-gray-50">
            <View className="pt-14 pb-4 px-4 bg-white border-b border-gray-200">
                <Text className="text-3xl font-bold text-gray-900">My Tasks</Text>
            </View>

            <View className="flex-1 items-center justify-center px-4">
                <Ionicons name="document-text-outline" size={80} color="#D1D5DB" />
                <Text className="mt-4 text-gray-400 text-xl font-medium">No tasks yet</Text>
                <Text className="text-gray-400 text-sm mt-1 text-center">
                    Tap + to create a new task
                </Text>
            </View>

            <TouchableOpacity
                className="absolute bottom-8 right-6 bg-blue-500 w-15 h-15 rounded-2xl items-center justify-center shadow-lg shadow-blue-300 active:bg-blue-600"
                onPress={() => navigation.navigate("TaskForm")}
                activeOpacity={0.8}
            >
                <Ionicons name="add" size={30} color="white" />
            </TouchableOpacity>
        </View>
    );
}
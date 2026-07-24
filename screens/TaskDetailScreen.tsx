import { View, Text } from "react-native";

interface Props {
    navigation: any;
    route: any;
}

export default function TaskDetailScreen({ navigation, route }: Props) {
    const { taskId } = route.params;

    return (
        <View className="flex-1 bg-gray-50 items-center justify-center">
            <Text className="text-gray-500 text-lg">Task #{taskId}</Text>
            <Text className="text-gray-400 text-sm mt-2">Details coming soon</Text>
        </View>
    );
}
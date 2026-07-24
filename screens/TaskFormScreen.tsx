import { View, Text } from "react-native";

interface Props {
    navigation: any;
    route?: any;
}

export default function TaskFormScreen({ navigation, route }: Props) {
    const taskId = route?.params?.taskId;
    const isEditing = !!taskId;

    return (
        <View className="flex-1 bg-gray-50 items-center justify-center">
            <Text className="text-gray-500 text-lg">
                {isEditing ? "Edit Task Form" : "New Task Form"}
            </Text>
        </View>
    );
}
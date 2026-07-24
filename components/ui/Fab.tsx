import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface FabProps {
    onPress: () => void;
}

export default function Fab({ onPress }: FabProps) {
    return (
        <TouchableOpacity
            className="absolute bottom-8 right-6 bg-blue-500 w-15 h-15 rounded-2xl items-center justify-center shadow-lg shadow-blue-300 active:bg-blue-600"
            onPress={onPress}
            activeOpacity={0.8}
        >
            <Ionicons name="add" size={30} color="white" />
        </TouchableOpacity>
    );
}
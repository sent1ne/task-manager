import { View, Text, TouchableOpacity, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../hooks/useTheme";

interface SelectOption<T> {
    key: T;
    label: string;
}

interface SelectModalProps<T> {
    visible: boolean;
    title: string;
    options: SelectOption<T>[];
    selected: T;
    onSelect: (key: T) => void;
    onClose: () => void;
}

export default function SelectModal<T extends string | null>({
    visible,
    title,
    options,
    selected,
    onSelect,
    onClose,
}: SelectModalProps<T>) {
    const { isDark } = useTheme();

    return (
        <Modal visible={visible} transparent animationType="fade">
            <TouchableOpacity
                className="flex-1 bg-black/50 justify-center items-center"
                activeOpacity={1}
                onPress={onClose}
            >
                <View className={`w-4/5 rounded-2xl overflow-hidden ${isDark ? "bg-zinc-800" : "bg-white"}`}>
                    {/* Header */}
                    <View className={`px-5 py-4 border-b ${isDark ? "border-zinc-700" : "border-zinc-200"}`}>
                        <Text className={`text-lg font-semibold ${isDark ? "text-white" : "text-zinc-900"}`}>
                            {title}
                        </Text>
                    </View>

                    {options.map((option, index) => (
                        <TouchableOpacity
                            key={String(option.key)}
                            className={`px-5 py-4 flex-row items-center justify-between ${isDark ? "border-zinc-700" : "border-zinc-200"
                                } ${index < options.length - 1 ? "border-b" : ""}`}
                            onPress={() => onSelect(option.key)}
                        >
                            <Text className={`text-base ${isDark ? "text-zinc-300" : "text-zinc-700"}`}>
                                {option.label}
                            </Text>
                            {selected === option.key && (
                                <Ionicons name="checkmark" size={20} color="#3B82F6" />
                            )}
                        </TouchableOpacity>
                    ))}
                </View>
            </TouchableOpacity>
        </Modal>
    );
}
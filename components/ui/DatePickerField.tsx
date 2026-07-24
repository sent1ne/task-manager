import { View, Text, TouchableOpacity, Platform, Modal } from "react-native";
import { useState } from "react";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../hooks/useTheme";

interface DatePickerFieldProps {
    label: string;
    value: string;
    onChange: (isoString: string) => void;
    error?: string;
    required?: boolean;
}

export default function DatePickerField({ label, value, onChange, error, required }: DatePickerFieldProps) {
    const { isDark } = useTheme();
    const [show, setShow] = useState(false);

    const date = value ? new Date(value) : new Date();
    const isValid = value.length > 0 && !isNaN(date.getTime());

    const handleChange = (_event: DateTimePickerEvent, selectedDate?: Date) => {
        if (Platform.OS === "android") {
            setShow(false);
        }
        if (selectedDate) {
            onChange(selectedDate.toISOString());
        }
    };

    const formatDisplay = (isoString: string): string => {
        if (!isoString) return "";
        const d = new Date(isoString);
        if (isNaN(d.getTime())) return "";
        return d.toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const pickerComponent = (
        <DateTimePicker
            value={isValid ? date : new Date()}
            mode="datetime"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={handleChange}
            minimumDate={new Date()}
            themeVariant={isDark ? "dark" : "light"}
        />
    );

    return (
        <View className="mb-4">
            <Text className={`text-sm font-semibold mb-2 ${isDark ? "text-zinc-300" : "text-zinc-700"}`}>
                {label} {required && "*"}
            </Text>

            <TouchableOpacity
                className={`p-4 rounded-xl border flex-row items-center justify-between ${error
                    ? "border-red-500 bg-red-50"
                    : isDark
                        ? "bg-zinc-800 border-zinc-700"
                        : "bg-white border-zinc-200"
                    }`}
                onPress={() => setShow(true)}
                activeOpacity={0.7}
            >
                <Text
                    className={`text-base ${isValid
                        ? isDark
                            ? "text-white"
                            : "text-zinc-900"
                        : isDark
                            ? "text-zinc-500"
                            : "text-zinc-400"
                        }`}
                >
                    {isValid ? formatDisplay(value) : "Select date & time"}
                </Text>
                <Ionicons name="calendar-outline" size={20} color={isDark ? "#A1A1AA" : "#71717A"} />
            </TouchableOpacity>

            {error && <Text className="text-red-500 text-sm mt-1">{error}</Text>}

            {show && Platform.OS === "android" && pickerComponent}

            {show && Platform.OS === "ios" && (
                <Modal transparent animationType="slide">
                    <View className="flex-1 justify-end bg-black/50">
                        <View className={`rounded-t-2xl p-4 ${isDark ? "bg-zinc-800" : "bg-white"}`}>
                            <View className="flex-row justify-between items-center mb-4">
                                <TouchableOpacity onPress={() => setShow(false)}>
                                    <Text className="text-blue-500 font-semibold text-base">Cancel</Text>
                                </TouchableOpacity>
                                <Text className={`font-semibold text-base ${isDark ? "text-white" : "text-zinc-900"}`}>
                                    {label}
                                </Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        if (!isValid) {
                                            onChange(new Date().toISOString());
                                        }
                                        setShow(false);
                                    }}
                                >
                                    <Text className="text-blue-500 font-semibold text-base">Done</Text>
                                </TouchableOpacity>
                            </View>
                            {pickerComponent}
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
}
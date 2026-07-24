import { View, Text, TextInput, TextInputProps } from "react-native";
import { useThemeColors } from "../../hooks/useTheme";

interface FormFieldProps extends TextInputProps {
    label: string;
    error?: string;
    required?: boolean;
}

export default function FormField({ label, error, required, multiline, ...inputProps }: FormFieldProps) {
    const { inputClass, textMuted } = useThemeColors();

    return (
        <View className="mb-4">
            <Text className={`text-sm font-semibold mb-2 ${textMuted}`}>
                {label} {required && "*"}
            </Text>
            <TextInput
                className={inputClass(!!error)}
                placeholderTextColor="#71717A"
                multiline={multiline}
                numberOfLines={multiline ? 4 : undefined}
                textAlignVertical={multiline ? "top" : undefined}
                {...inputProps}
            />
            {error && <Text className="text-red-500 text-sm mt-1">{error}</Text>}
        </View>
    );
}
import { View, TouchableOpacity, ScrollView, Alert, KeyboardAvoidingView, Platform, Text } from "react-native";
import { useState } from "react";
import { useTasks } from "../hooks/useTasks";
import { useTheme, useThemeColors } from "../hooks/useTheme";
import { TaskStatus } from "../types/task";
import { generateId, nowISO } from "../utils/helpers";
import DatePickerField from "../components/ui/DatePickerField";
import FormField from "../components/ui/FormField";

interface Props {
    navigation: any;
    route?: any;
}

export default function TaskFormScreen({ navigation, route }: Props) {
    const taskId = route?.params?.taskId;
    const isEditing = !!taskId;
    const { addTask, updateTask, getTask } = useTasks();

    const { isDark } = useTheme();
    const { bgScreen, border } = useThemeColors();

    const existingTask = taskId ? getTask(taskId) : undefined;

    const [title, setTitle] = useState(existingTask?.title || "");
    const [description, setDescription] = useState(existingTask?.description || "");
    const [dueDate, setDueDate] = useState(existingTask?.dueDate || "");
    const [address, setAddress] = useState(existingTask?.location.address || "");
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [saving, setSaving] = useState(false);

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!title.trim()) newErrors.title = "Title is required";
        if (!description.trim()) newErrors.description = "Description is required";
        if (!dueDate) newErrors.dueDate = "Date is required";
        if (!address.trim()) newErrors.address = "Address is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = async () => {
        if (!validate()) {
            Alert.alert("Error", "Please fill in all required fields");
            return;
        }

        setSaving(true);
        try {
            if (isEditing && existingTask) {
                const historyEntry = {
                    id: generateId(),
                    timestamp: nowISO(),
                    action: "edited" as const,
                    description: "Task edited",
                };

                await updateTask(taskId, {
                    title: title.trim(),
                    description: description.trim(),
                    dueDate,
                    location: { address: address.trim() },
                    updatedAt: nowISO(),
                    history: [...existingTask.history, historyEntry],
                });
            } else {
                await addTask({
                    title: title.trim(),
                    description: description.trim(),
                    dueDate,
                    location: { address: address.trim() },
                    status: "New" as TaskStatus,
                    attachments: [],
                });
            }
            navigation.goBack();
        } catch (error) {
            Alert.alert("Error", "Failed to save task");
        } finally {
            setSaving(false);
        }
    };

    return (
        <KeyboardAvoidingView
            className={`flex-1 ${bgScreen}`}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView className="flex-1" keyboardShouldPersistTaps="handled">
                <View className="p-4">
                    <FormField
                        label="Task Title"
                        value={title}
                        onChangeText={setTitle}
                        error={errors.title}
                        required
                        placeholder="Enter title"
                    />

                    <FormField
                        label="Description"
                        value={description}
                        onChangeText={setDescription}
                        error={errors.description}
                        required
                        multiline
                        placeholder="Enter description"
                    />

                    <DatePickerField
                        label="Due Date & Time"
                        value={dueDate}
                        onChange={setDueDate}
                        error={errors.dueDate}
                        required
                    />

                    <FormField
                        label="Address"
                        value={address}
                        onChangeText={setAddress}
                        error={errors.address}
                        required
                        placeholder="Enter address"
                    />

                    <TouchableOpacity
                        className={`p-4 rounded-xl items-center mb-3 ${saving ? "bg-blue-300" : "bg-blue-500 active:bg-blue-600"}`}
                        onPress={handleSave}
                        disabled={saving}
                        activeOpacity={0.8}
                    >
                        <Text className="text-white font-semibold text-base">
                            {saving ? "Saving..." : isEditing ? "Save Changes" : "Create Task"}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className={`p-4 rounded-xl items-center border ${border}`}
                        onPress={() => navigation.goBack()}
                    >
                        <Text className={`font-medium ${isDark ? "text-zinc-300" : "text-zinc-600"}`}>
                            Cancel
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
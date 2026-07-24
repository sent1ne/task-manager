import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../hooks/useTheme";
import { useThemeColors } from "../../hooks/useTheme";
import { pickImage, deleteImage } from "../../services/imageService";
import { Attachment } from "../../types/task";
import { generateId } from "../../utils/helpers";

interface AttachmentPickerProps {
    attachments: Attachment[];
    onAttachmentsChange: (attachments: Attachment[]) => void;
}

export default function AttachmentPicker({ attachments, onAttachmentsChange }: AttachmentPickerProps) {
    const { isDark } = useTheme();
    const { bgCard, border } = useThemeColors();

    const handlePickImage = async () => {
        const result = await pickImage();
        if (result) {
            const newAttachment: Attachment = {
                id: generateId(),
                uri: result.uri,
                type: "image",
                name: result.name,
            };
            onAttachmentsChange([...attachments, newAttachment]);
        }
    };

    const handleRemoveImage = (attachment: Attachment) => {
        Alert.alert("Remove Image", "Are you sure?", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Remove",
                style: "destructive",
                onPress: async () => {
                    await deleteImage(attachment.uri);
                    onAttachmentsChange(attachments.filter((a) => a.id !== attachment.id));
                },
            },
        ]);
    };

    return (
        <View className="mb-4">
            <Text className={`text-sm font-semibold mb-2 ${isDark ? "text-zinc-300" : "text-zinc-700"}`}>
                Attachments
            </Text>

            {attachments.length > 0 && (
                <View className="flex-row flex-wrap gap-2 mb-3">
                    {attachments.map((attachment) => (
                        <View key={attachment.id}>
                            <Image
                                source={attachment.uri}
                                style={{ width: 80, height: 80, borderRadius: 8 }}
                                contentFit="cover"
                            />
                            <TouchableOpacity
                                className="absolute -top-2 -right-2 bg-red-500 rounded-full w-6 h-6 items-center justify-center"
                                onPress={() => handleRemoveImage(attachment)}
                            >
                                <Ionicons name="close" size={14} color="white" />
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            )}

            <TouchableOpacity
                className={`p-4 rounded-xl border border-dashed ${border} ${bgCard} items-center`}
                onPress={handlePickImage}
            >
                <Ionicons name="image-outline" size={24} color="#A1A1AA" />
                <Text className="text-zinc-400 text-sm mt-1">
                    {attachments.length === 0 ? "Add Image" : "Add Another"}
                </Text>
            </TouchableOpacity>
        </View>
    );
}
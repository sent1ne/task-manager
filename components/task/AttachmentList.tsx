import { View, Text } from "react-native";
import { useState } from "react";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../hooks/useTheme";
import { useThemeColors } from "../../hooks/useTheme";
import { Attachment } from "../../types/task";

interface AttachmentListProps {
    attachments: Attachment[];
}

export default function AttachmentList({ attachments }: AttachmentListProps) {
    const { isDark } = useTheme();
    const { bgCard } = useThemeColors();
    const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

    if (attachments.length === 0) return null;

    const handleImageError = (uri: string) => {
        setFailedImages((prev) => new Set(prev).add(uri));
    };

    return (
        <View className={`mt-3 p-4 ${bgCard}`}>
            <Text className={`text-lg font-semibold mb-3 ${isDark ? "text-white" : "text-zinc-900"}`}>
                Attachments
            </Text>
            <View className="flex-row flex-wrap gap-3">
                {attachments.map((attachment) => (
                    <View key={attachment.id} style={{ width: "47%" }}>
                        {failedImages.has(attachment.uri) ? (
                            <View className="bg-zinc-700 rounded-xl h-32 items-center justify-center">
                                <Ionicons name="image-outline" size={32} color="#71717A" />
                                <Text className="text-zinc-500 text-xs mt-1">Unavailable</Text>
                            </View>
                        ) : (
                            <Image
                                source={attachment.uri}
                                style={{ width: "100%", height: 128, borderRadius: 12 }}
                                contentFit="cover"
                                onError={() => handleImageError(attachment.uri)}
                            />
                        )}
                        <Text className="text-zinc-500 text-xs mt-1" numberOfLines={1}>
                            {attachment.name}
                        </Text>
                    </View>
                ))}
            </View>
        </View>
    );
}
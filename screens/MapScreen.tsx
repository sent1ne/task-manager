import { View } from "react-native";
import { useTheme } from "../hooks/useTheme";
import ScreenHeader from "../components/ui/ScreenHeader";
import EmptyState from "../components/ui/EmptyState";

export default function MapScreen() {
    const { isDark } = useTheme();

    return (
        <View className={`flex-1 ${isDark ? "bg-zinc-900" : "bg-white"}`}>
            <ScreenHeader
                title="Map"
                subtitle="View task locations"
            />
            <View className="flex-1 justify-center">
                <EmptyState
                    icon="map-outline"
                    title="Map"
                    subtitle="Task markers will appear here"
                />
            </View>
        </View>
    );
}
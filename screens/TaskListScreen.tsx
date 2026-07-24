import { View, Text, FlatList, TouchableOpacity, TextInput } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useTasks } from "../hooks/useTasks";
import { useTheme, useThemeColors } from "../hooks/useTheme";
import { useTaskFilters, SortOption } from "../hooks/useTaskFilters";
import TaskCard from "../components/task/TaskCard";
import Fab from "../components/ui/Fab";
import EmptyState from "../components/ui/EmptyState";
import ScreenHeader from "../components/ui/ScreenHeader";
import SelectModal from "../components/ui/SelectModal";

interface Props {
    navigation: any;
}

const SORT_OPTIONS: { key: SortOption; label: string }[] = [
    { key: "created", label: "Date Created" },
    { key: "dueDate", label: "Due Date" },
    { key: "status", label: "Status" },
];

const STATUS_FILTERS: { key: string | null; label: string }[] = [
    { key: null, label: "All" },
    { key: "New", label: "New" },
    { key: "In Progress", label: "In Progress" },
    { key: "Completed", label: "Completed" },
    { key: "Cancelled", label: "Cancelled" },
];

export default function TaskListScreen({ navigation }: Props) {
    const { tasks, loading } = useTasks();
    const { isDark } = useTheme();
    const { bgScreen, bgCard, border } = useThemeColors();
    const [showSortModal, setShowSortModal] = useState(false);
    const [showFilterModal, setShowFilterModal] = useState(false);

    const {
        sortBy,
        setSortBy,
        searchQuery,
        setSearchQuery,
        statusFilter,
        setStatusFilter,
        filteredAndSortedTasks,
    } = useTaskFilters(tasks);

    if (loading) {
        return (
            <View className={`flex-1 items-center justify-center ${bgScreen}`}>
                <Text className="text-zinc-400 text-lg">Loading...</Text>
            </View>
        );
    }

    const activeFiltersCount = (statusFilter ? 1 : 0) + (searchQuery.trim() ? 1 : 0);

    return (
        <View className={`flex-1 ${bgScreen}`}>
            <ScreenHeader
                title="My Tasks"
                subtitle={
                    searchQuery.trim() || statusFilter
                        ? `${filteredAndSortedTasks.length} of ${tasks.length} tasks`
                        : `${tasks.length} ${tasks.length === 1 ? "task" : "tasks"}`
                }
            />

            <View className={`px-4 pt-3 pb-4 ${bgScreen}`}>
                <View className="flex-row items-center gap-2">
                    <View className={`flex-1 flex-row items-center px-3 py-2.5 rounded-xl ${bgCard} border ${border}`}>
                        <Ionicons name="search" size={18} color={isDark ? "#A1A1AA" : "#71717A"} />
                        <TextInput
                            className={`flex-1 ml-2 text-base ${isDark ? "text-white" : "text-zinc-900"}`}
                            placeholder="Search tasks..."
                            placeholderTextColor={isDark ? "#71717A" : "#A1A1AA"}
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                        {searchQuery.length > 0 && (
                            <TouchableOpacity onPress={() => setSearchQuery("")}>
                                <Ionicons name="close-circle" size={18} color={isDark ? "#A1A1AA" : "#71717A"} />
                            </TouchableOpacity>
                        )}
                    </View>

                    <TouchableOpacity
                        className={`w-10 h-10 rounded-xl items-center justify-center border ${statusFilter ? "bg-blue-500 border-blue-500" : `${bgCard} ${border}`}`}
                        onPress={() => setShowFilterModal(true)}
                    >
                        <Ionicons
                            name="filter-outline"
                            size={18}
                            color={statusFilter ? "#FFFFFF" : isDark ? "#A1A1AA" : "#71717A"}
                        />
                        {activeFiltersCount > 0 && (
                            <View className="absolute -top-1 -right-1 bg-blue-600 rounded-full w-4 h-4 items-center justify-center">
                                <Text className="text-white text-[10px] font-bold">{activeFiltersCount}</Text>
                            </View>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity
                        className={`w-10 h-10 rounded-xl items-center justify-center border ${bgCard} ${border}`}
                        onPress={() => setShowSortModal(true)}
                    >
                        <Ionicons name="swap-vertical-outline" size={18} color={isDark ? "#A1A1AA" : "#71717A"} />
                    </TouchableOpacity>
                </View>
            </View>

            <FlatList
                data={filteredAndSortedTasks}
                keyExtractor={(item) => item.id}
                className="px-4"
                contentContainerStyle={{ paddingBottom: 100 }}
                ListEmptyComponent={
                    searchQuery.trim() || statusFilter ? (
                        <EmptyState
                            icon="search-outline"
                            title="No matches found"
                            subtitle="Try adjusting your search or filters"
                        />
                    ) : (
                        <EmptyState
                            icon="document-text-outline"
                            title="No tasks yet"
                            subtitle="Tap + to create a new task"
                        />
                    )
                }
                renderItem={({ item }) => (
                    <TaskCard
                        task={item}
                        onPress={() => navigation.navigate("TaskDetail", { taskId: item.id })}
                    />
                )}
            />

            <Fab onPress={() => navigation.navigate("TaskForm")} />

            <SelectModal
                visible={showSortModal}
                title="Sort Tasks"
                options={SORT_OPTIONS}
                selected={sortBy}
                onSelect={(key) => {
                    setSortBy(key);
                    setShowSortModal(false);
                }}
                onClose={() => setShowSortModal(false)}
            />

            <SelectModal
                visible={showFilterModal}
                title="Filter by Status"
                options={STATUS_FILTERS}
                selected={statusFilter}
                onSelect={(key) => {
                    setStatusFilter(key);
                    setShowFilterModal(false);
                }}
                onClose={() => setShowFilterModal(false)}
            />
        </View>
    );
}
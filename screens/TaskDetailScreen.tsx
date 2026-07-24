import { ScrollView } from "react-native";
import { useTasks } from "../hooks/useTasks";
import { useThemeColors } from "../hooks/useTheme";
import { useConfirm } from "../hooks/useConfirm";
import { TaskStatus } from "../types/task";
import EmptyState from "../components/ui/EmptyState";
import TaskInfoSection from "../components/task/TaskInfoSection";
import TaskSyncStatus from "../components/task/TaskSyncStatus";
import TaskHistory from "../components/task/TaskHistory";
import TaskActions from "../components/task/TaskActions";

interface Props {
    navigation: any;
    route: any;
}

export default function TaskDetailScreen({ navigation, route }: Props) {
    const { taskId } = route.params;
    const { getTask, removeTask, updateStatus } = useTasks();
    const { bgScreen } = useThemeColors();
    const { confirm } = useConfirm();
    const task = getTask(taskId);

    if (!task) {
        return (
            <EmptyState
                icon="alert-circle-outline"
                title="Task not found"
                subtitle="This task may have been deleted"
            />
        );
    }

    const handleDelete = async () => {
        const confirmed = await confirm({
            title: "Delete Task",
            message: "Are you sure you want to delete this task?",
            confirmText: "Delete",
            destructive: true,
        });
        if (confirmed) {
            await removeTask(task.id);
            navigation.goBack();
        }
    };

    const handleStatusChange = (newStatus: TaskStatus) => {
        updateStatus(task.id, newStatus);
    };

    return (
        <ScrollView className={`flex-1 ${bgScreen}`}>
            <TaskInfoSection task={task} />
            <TaskSyncStatus task={task} />
            <TaskHistory task={task} />
            <TaskActions
                task={task}
                onEdit={() => navigation.navigate("TaskForm", { taskId: task.id })}
                onStatusChange={handleStatusChange}
                onDelete={handleDelete}
            />
        </ScrollView>
    );
}
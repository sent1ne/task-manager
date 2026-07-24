import "./global.css";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { TaskProvider } from "./hooks/useTasks";
import { ThemeProvider, useTheme } from "./hooks/useTheme";

import TaskListScreen from "./screens/TaskListScreen";
import TaskFormScreen from "./screens/TaskFormScreen";
import TaskDetailScreen from "./screens/TaskDetailScreen";
import MapScreen from "./screens/MapScreen";
import HistoryScreen from "./screens/HistoryScreen";
import SettingsScreen from "./screens/SettingsScreen";

type RootStackParamList = {
  MainTabs: undefined;
  TaskDetail: { taskId: string };
  TaskForm: { taskId?: string } | undefined;
};

type TabParamList = {
  TaskList: undefined;
  Map: undefined;
  History: undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function MainTabs() {
  const { isDark } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "list";
          if (route.name === "TaskList") iconName = focused ? "list" : "list-outline";
          else if (route.name === "Map") iconName = focused ? "map" : "map-outline";
          else if (route.name === "History") iconName = focused ? "time" : "time-outline";
          else if (route.name === "Settings") iconName = focused ? "settings" : "settings-outline";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#3B82F6",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDark ? "#27272A" : "#FFFFFF",  // zinc-800 / white
          borderTopWidth: 1,
          borderTopColor: isDark ? "#3F3F46" : "#E4E4E7",  // zinc-700 / zinc-200
          paddingTop: 4,
          height: 60,
        },
        tabBarInactiveTintColor: isDark ? "#71717A" : "#A1A1AA",
        tabBarLabelStyle: { fontSize: 12, fontWeight: "500" },
      })}
    >
      <Tab.Screen name="TaskList" component={TaskListScreen} options={{ title: "Tasks" }} />
      <Tab.Screen name="Map" component={MapScreen} options={{ title: "Map" }} />
      <Tab.Screen name="History" component={HistoryScreen} options={{ title: "History" }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: "Settings" }} />
    </Tab.Navigator>
  );
}

function AppNavigator() {
  const { isDark } = useTheme();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: isDark ? "#1F2937" : "#FFFFFF",
          },
          headerTintColor: isDark ? "#F9FAFB" : "#111827",
          headerTitleStyle: {
            fontWeight: "600",
          },
          contentStyle: {
            backgroundColor: isDark ? "#111827" : "#F9FAFB",
          },
        }}
      >
        <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
        <Stack.Screen name="TaskDetail" component={TaskDetailScreen} options={{ title: "Task Details", headerBackTitle: "Back" }} />
        <Stack.Screen name="TaskForm" component={TaskFormScreen} options={({ route }) => ({ title: route.params?.taskId ? "Edit Task" : "New Task", headerBackTitle: "Back" })} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <TaskProvider>
        <AppNavigator />
      </TaskProvider>
    </ThemeProvider>
  );
}
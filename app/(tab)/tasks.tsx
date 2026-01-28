import React, { useState, useEffect } from "react";
import { Text, View, Pressable, FlatList } from "react-native";
import styles from "@/utils/task.style";
import ProgressBar from "@/components/ProgressBar";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useAuthStore } from "@/store/authStore";
import { Link } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";
import { supabase } from "@/utils/supabase";
import { COLORS } from "@/constants/color";
import { useLoadingStore } from "@/store/loadingStore";
import moment from "moment";

interface Task {
  id: string;
  task_name: string;
  tag: string;
  priority: string;
  due_date: string;
  estimated_time: string;
  is_complete: boolean;
}

const formatDateToYYYYMMDD = (dateString: string): string => {
  if (!dateString) return "";
  const [day, month, year] = dateString.split("/");
  return `${year}-${month}-${day}`;
};



const Tasks = () => {
  const { userInfo } = useAuthStore();
  const { setLoading } = useLoadingStore();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTask, setCompletedTask] = useState(0);
  const percentTask = isNaN(Math.round((completedTask / tasks.length) * 100))
    ? 0
    : Math.round((completedTask / tasks.length) * 100);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("Tasks")
        .select("*")
        .eq("user_id", userInfo?.id)
        .eq("due_date", moment().format("DD/MM/YYYY"))
        .order("estimated_time", { ascending: true });

      if (error) throw error;
      setTasks(data || []);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOverviewTask = async () => {
    try {
      setLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("Tasks")
        .select("*")
        .eq("user_id", userInfo?.id)
        .eq("due_date", moment().format("DD/MM/YYYY"))
        .eq("is_complete", true);

      if (error) throw error;
      setCompletedTask(data.length);
    } catch (error) {
      console.error("Error fetching complete tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleComplete = async (
    taskId: string,
    currentStatus: boolean
  ) => {
    try {
      const { data, error } = await supabase
        .from("Tasks")
        .update({ is_complete: true })
        .eq("id", taskId)
        .select();
      if (error) throw error;
      await fetchTasks();
      await fetchOverviewTask();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const getTagColor = (tag: string): string => {
    const tagColors: { [key: string]: string } = {
      Personal: "#4D96FF",
      Work: "#FFB84D",
      Health: "#4CAF50",
      Shopping: "#FF9ED5",
      Development: "#9B59B6",
      Finance: "#F39C12",
    };
    return tagColors[tag] || "#999999";
  };

  const getPriorityColor = (priority: string): string => {
    const priorityColors: { [key: string]: string } = {
      High: COLORS.colors.error,
      Medium: COLORS.colors.warning,
      Low: COLORS.colors.info,
    };
    return priorityColors[priority] || COLORS.colors.border;
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    fetchOverviewTask();
  }, []);

  const renderTaskItem = ({ item }: { item: Task }) => {
    const dueDate = moment(
      `${formatDateToYYYYMMDD(item.due_date)} ${item.estimated_time}:00`
    );
    const duration = moment.duration(dueDate.diff(moment())).milliseconds() > 0;
    return (
      <View
        style={{
          ...styles.taskItem,
          borderLeftColor: duration
            ? COLORS.colors.surface
            : COLORS.colors.warning,
          borderLeftWidth: duration ? 1 : 2,
          opacity: item.is_complete ? 0.6 : 1,
        }}
      >
        <Pressable
          style={styles.checkboxContainer}
          onPress={() => handleToggleComplete(item.id, item.is_complete)}
        >
          {item.is_complete ? (
            <View style={styles.checkboxChecked}>
              <Ionicons name="checkmark" size={16} color="white" />
            </View>
          ) : (
            <View style={styles.checkboxUnchecked} />
          )}
        </Pressable>

        <View style={styles.taskContent}>
          <Text
            style={[
              styles.taskTitle,
              item.is_complete && styles.taskTitleCompleted,
            ]}
          >
            {item.task_name}
          </Text>
          {item.estimated_time && (
            <View style={styles.taskTimeContainer}>
              <Ionicons
                name={duration ? "time-outline" : "warning-outline"}
                size={14}
                color={duration ? COLORS.colors.error : COLORS.colors.text.secondary}
              />
              <Text
                style={{
                  ...styles.taskTime,
                  color: duration ? COLORS.colors.error : COLORS.colors.text.secondary,
                }}
              >
                {item.estimated_time}
              </Text>
              <Entypo
                name={"dot-single"}
                size={20}
                color={COLORS.colors.text.secondary}
              />
              <Text
                style={{
                  ...styles.priorityText,
                  color: getPriorityColor(item.priority),
                }}
              >
                {item.priority} Priority
              </Text>
            </View>
          )}
        </View>

        <View
          style={[
            styles.tagBadge,
            { backgroundColor: `${getTagColor(item.tag)}20` },
          ]}
        >
          <Text style={[styles.tagText, { color: getTagColor(item.tag) }]}>
            {item.tag}
          </Text>
        </View>
      </View>
    );
  };

  const ListHeaderComponent = () => (
    <View>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.welcomeContainer}>
          <Image
            source={{ uri: userInfo?.avatar ?? "" }}
            style={styles.avatar}
            contentFit="cover"
          />
          <View>
            <Text style={styles.title}>Hello, {userInfo?.name}</Text>
            <Text style={styles.dateText}>
              {moment().format("dddd, MMM DD")}
            </Text>
          </View>
        </View>
        <Link href="/(modal)/addTask" asChild>
          <Pressable style={styles.addIcon}>
            <Ionicons name="add" size={26} color={COLORS.colors.background} />
          </Pressable>
        </Link>
      </View>

      {/* My Tasks Title */}
      <Text style={styles.myTasksTitle}>My Tasks</Text>

      {/* Overview Container */}
      <View style={styles.overviewContainer}>
        <View style={styles.overviewStats}>
          <View style={styles.statColumn}>
            <Text style={styles.statLabel}>PENDING</Text>
            <View style={styles.statRow}>
              <Text style={styles.statValue}>{0}</Text>
              <Text style={styles.statUnit}>tasks</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.statColumn}>
            <Text style={styles.statLabel}>COMPLETED</Text>
            <View style={styles.statRow}>
              <Text style={styles.statValue}>{completedTask}</Text>
              <Text style={styles.statUnit}>tasks</Text>
            </View>
          </View>

          <View style={styles.progressCircleContainer}>
            <View
              style={[
                styles.progressCircle,
                {
                  borderTopColor: COLORS.colors.primary,
                  borderRightColor: COLORS.colors.primary,
                  borderBottomColor: COLORS.colors.border,
                  borderLeftColor: COLORS.colors.border,
                },
              ]}
            >
              <Text style={styles.progressText}>{percentTask}%</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <FlatList
      data={tasks}
      renderItem={renderTaskItem}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={ListHeaderComponent}
      contentContainerStyle={styles.flatListContainer}
      scrollEnabled={true}
    />
  );
};

export default Tasks;

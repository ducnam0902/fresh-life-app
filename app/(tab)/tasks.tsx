import React, { useState, useEffect } from "react";
import { Text, View, Pressable, FlatList } from "react-native";
import styles from "@/utils/task.style";
import ProgressBar from "@/components/ProgressBar";
import { Ionicons } from "@expo/vector-icons";
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
  const percentTask = Math.round((completedTask / tasks.length) * 100);

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
        .order("estimated_time", { ascending: true })

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
          borderLeftColor: duration ? COLORS.border : COLORS.error,
          borderLeftWidth: duration ? 1 : 4,
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
                color={duration ? COLORS.accent : COLORS.error}
              />
              <Text
                style={{
                  ...styles.taskTime,
                  color: duration ? COLORS.accent : COLORS.error,
                }}
              >
                {item.estimated_time}
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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.welcomeContainer}>
          <Image
            source={{ uri: userInfo?.avatar ?? "" }}
            style={styles.avatar}
            contentFit="contain"
          />
          <View>
            <Text style={styles.title}>Task List</Text>
          </View>
        </View>
        <View style={styles.addIcon}>
          <Link href="/(modal)/addTask">
            <Ionicons name="add-outline" size={30} color="black" />
          </Link>
        </View>
      </View>

      <View style={styles.overviewContainer}>
        <Text style={styles.overviewTitle}>Daily Progress </Text>
        <View style={styles.progress}>
          <View style={styles.percentTask}>
            <Text style={styles.percent}>{isNaN(percentTask) ? 0 : percentTask }%</Text>
            <Text style={styles.percentText}> done</Text>
          </View>
          <View style={styles.doneTask}>
            <Text style={styles.doneTitle}>
              {completedTask}/{tasks.length} tasks
            </Text>
          </View>
        </View>
        <ProgressBar activePercents={`${isNaN(percentTask) ? 0 : percentTask}%`} />
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.titleText}> Today's Focus</Text>
      </View>

      <FlatList
        data={tasks}
        renderItem={renderTaskItem}
        scrollEnabled={false}
        nestedScrollEnabled={true}
      />
    </ScrollView>
  );
};

export default Tasks;

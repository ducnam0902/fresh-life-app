import { COLORS } from "@/constants/color";
import { useAuthStore } from "@/store/authStore";
import { useLoadingStore } from "@/store/loadingStore";
import styles from "@/utils/taskDetails.style";
import tasksServices from "@/services/taskServices";
import { getPriorityColor, getTagColor, Task } from "@/utils/tasksUtils";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Dimensions, Pressable, ScrollView, Text, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { is } from "zod/locales";

const TaskDetailsScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { isLoading, setLoading } = useLoadingStore();
  const { userInfo } = useAuthStore();
  const [task, setTask] = useState<Task | null>(null);

  const fetchTaskDetails = async () => {
    try {
      setLoading(true);
      if (!id) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Task ID not found",
        });
        router.back();
        return;
      }
      const data = await tasksServices.fetchTaskById(id);
      setTask(data);
    } catch (error) {
      console.error("Error fetching task details:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to load task details",
      });
      router.back();
    } finally {
      setLoading(false);
    }
  };

  const handleToggleComplete = async () => {
    try {
      setLoading(true);
      const res = await tasksServices.completeTask(id, userInfo?.id ?? 0);
      if (res.id == id && res.is_complete === true) {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Task completed successfully!",
        });
        router.push("/(tab)/tasks");
      }
      if (!res) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Failed to complete task",
        });
        router.back();
      }
    } catch (error) {
      console.error("Error updating task:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (): string => {
    if (task?.is_complete) return COLORS.colors.primary;
    return COLORS.colors.warning;
  };

  useEffect(() => {
    fetchTaskDetails();
  }, [id]);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      {isLoading && null}
      {!task && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Task not found</Text>
        </View>
      )}
      {task && (
        <View
          style={{
            ...styles.contentContainer,
            height:
              Dimensions.get("window").height - insets.top - insets.bottom,
          }}
        >
          <View>
            <View style={styles.header}>
              <Pressable
                onPress={() => router.back()}
                style={styles.backButton}
              >
                <Ionicons
                  name="chevron-back"
                  size={28}
                  color={COLORS.colors.text.primary}
                />
              </Pressable>
              <Text style={styles.headerTitle}>Task Details</Text>
            </View>

            {/* Current Status Card */}
            <View style={styles.statusCard}>
              <View style={styles.statusContent}>
                <View>
                  <Text style={styles.statusLabel}>CURRENT STATUS</Text>
                  <View style={styles.statusLeft}>
                    <View
                      style={[
                        styles.statusDot,
                        { backgroundColor: getStatusColor() },
                      ]}
                    />
                    <Text
                      style={[styles.statusText, { color: getStatusColor() }]}
                    >
                      {task.is_complete ? "Completed" : "Todo"}
                    </Text>
                  </View>
                </View>

                <View
                  style={[
                    styles.tagBadge,
                    { backgroundColor: `${getTagColor(task.tag)}20` },
                  ]}
                >
                  <Text
                    style={[
                      styles.tagBadgeText,
                      { color: getTagColor(task.tag) },
                    ]}
                  >
                    {task.tag}
                  </Text>
                </View>
              </View>
            </View>

            {/* Task Title */}
            <View style={styles.titleSection}>
              <Text style={styles.taskTitle}>{task.task_name}</Text>
            </View>

            {/* Priority */}
            <View style={styles.infoSection}>
              <View style={styles.infoBadge}>
                <Ionicons
                  name="alert-outline"
                  size={20}
                  color={getPriorityColor(task.priority)}
                />
                <Text
                  style={[
                    styles.infoText,
                    { color: getPriorityColor(task.priority) },
                  ]}
                >
                  {task.priority} Priority
                </Text>
              </View>
            </View>

            {/* Date & Time */}
            <View style={styles.infoSection}>
              <View style={styles.infoBadge}>
                <MaterialCommunityIcons
                  name="clock-outline"
                  size={18}
                  color={COLORS.colors.text.secondary}
                />
                <Text style={styles.infoText}>
                  {moment(task.estimated_time, "HH:mm").format("h:mm A")}
                </Text>
              </View>
            </View>
          </View>
          <View>
            {/* Mark as Completed Button */}
            {!task.is_complete && (
              <View style={styles.buttonContainer}>
                <Pressable
                  style={styles.completedButton}
                  onPress={handleToggleComplete}
                >
                  <Text style={styles.completedButtonText}>
                    Mark as Completed
                  </Text>
                </Pressable>
              </View>
            )}

            {task.is_complete && (
              <View style={styles.completedBanner}>
                <Ionicons
                  name="checkmark-circle"
                  size={24}
                  color={COLORS.colors.primary}
                />
                <Text style={styles.completedBannerText}>Task Completed</Text>
              </View>
            )}
          </View>
        </View>
      )}
      {/* Header */}
    </ScrollView>
  );
};

export default TaskDetailsScreen;

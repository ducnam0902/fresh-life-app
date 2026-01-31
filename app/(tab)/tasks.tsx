import { COLORS } from "@/constants/color";
import { useAuthStore } from "@/store/authStore";
import { useLoadingStore } from "@/store/loadingStore";
import styles from "@/utils/task.style";
import tasksServices from "@/utils/taskServices";
import { getPriorityColor, getTagColor, Task } from "@/utils/tasksUtils";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Link } from "expo-router";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { ProgressChart } from "react-native-chart-kit";
import Toast from "react-native-toast-message";

const chartConfig = {
  backgroundGradientFrom: COLORS.colors.surface,
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: COLORS.colors.surface,
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

const formatDateToYYYYMMDD = (dateString: string): string => {
  if (!dateString) return "";
  const [day, month, year] = dateString.split("-");
  return `${year}-${month}-${day}`;
};

const Tasks = () => {
  const { userInfo } = useAuthStore();
  const { setLoading } = useLoadingStore();
  const [tasks, setTasks] = useState<Task[]>([]);
  const completedTask = tasks.filter((task) => task.is_complete).length;
  const data = {
    data: [
      isNaN(completedTask / tasks.length) ? 0 : completedTask / tasks.length,
    ],
  };

  const percentValue = Math.round(
    isNaN(completedTask / tasks.length)
      ? 0
      : (completedTask / tasks.length) * 100
  );

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await tasksServices.fetchTasks(
        userInfo?.id.toString() ?? ""
      );
      setTasks(data || []);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const renderTaskItem = ({ item }: { item: Task }) => {
    const dueDate = moment(
      `${formatDateToYYYYMMDD(item.due_date)} ${item.estimated_time}:00`
    );
    const duration = moment.duration(dueDate.diff(moment())).milliseconds() > 0;
    return (
      <Link
        style={styles.linkContainer}
        href={{
          pathname: "/(screens)/TaskDetails/[id]",
          params: { id: item.id },
        }}
      >
        <View
          style={{
            ...styles.taskItem,
            opacity: item.is_complete ? 0.6 : 1,
          }}
        >
          {!duration && !item.is_complete && (
            <>
              <View style={styles.activeCurves} />
              <View style={styles.hideCurves} />
            </>
          )}

          {item.is_complete ? (
            <View style={styles.checkboxChecked}>
              <Ionicons name="checkmark" size={16} color="white" />
            </View>
          ) : (
            <View style={styles.checkboxUnchecked} />
          )}

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
                  name={duration ? "warning-outline" : "time-outline"}
                  size={14}
                  color={
                    duration
                      ? COLORS.colors.text.secondary
                      : COLORS.colors.error
                  }
                />
                <Text
                  style={{
                    ...styles.taskTime,
                    color: duration
                      ? COLORS.colors.text.secondary
                      : COLORS.colors.error,
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
        </View>{" "}
      </Link>
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
            <Text style={styles.statLabel}>TODO</Text>
            <View style={styles.statRow}>
              <Text style={styles.statValue}>
                {tasks.length - completedTask}
              </Text>
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

          <View style={styles.chartContainer}>
            <ProgressChart
              data={data}
              width={120}
              height={100}
              strokeWidth={8}
              radius={32}
              chartConfig={chartConfig}
              hideLegend={true}
            />
            <Text style={styles.chartPercentText}>{percentValue} %</Text>
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

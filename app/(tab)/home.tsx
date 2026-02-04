import { COLORS } from "@/constants/color";
import { useAuthStore } from "@/store/authStore";
import { useLoadingStore } from "@/store/loadingStore";
import budgetServices from "@/services/budgetServices";
import { IExpenseGroup } from "@/utils/budgetUtils";
import styles from "@/utils/home.style";
import { supabase } from "@/utils/supabase";
import tasksServices from "@/services/taskServices";
import { Task } from "@/utils/tasksUtils";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Dimensions, Pressable, Text, View } from "react-native";
import { LineChart, ProgressChart } from "react-native-chart-kit";
import { ScrollView } from "react-native-gesture-handler";
import { formatCurrencyVND } from "../../utils/budgetUtils";
import Title from "@/components/Title";

const chartTasksConfig = {
  backgroundGradientFrom: COLORS.colors.surface,
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: COLORS.colors.surface,
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

const today = moment().format("DD-MM-YYYY");
const Home = () => {
  const { userInfo, setUser } = useAuthStore();
  const { setLoading } = useLoadingStore();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [expenseData, setExpenseData] = useState<IExpenseGroup>({
    totalExpenseToday: 0,
    Eating: 0,
    Drink: 0,
    Transport: 0,
    Shopping: 0,
    Other: 0,
    budgetToday: 0,
  });
  const completedTask = tasks.filter((task) => task.is_complete).length;
  const data = {
    data: [
      isNaN(completedTask / tasks.length) ? 0 : completedTask / tasks.length,
    ],
  };
  const percentValue = Math.round(
    isNaN(completedTask / tasks.length)
      ? 0
      : (completedTask / tasks.length) * 100,
  );
  const isOverBudgetColor =
    expenseData.totalExpenseToday > expenseData.budgetToday
      ? COLORS.colors.error
      : COLORS.colors.primary;
  const handleLogout = async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut();
      setUser(null);
      router.replace("/(auth)");
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await tasksServices.fetchTasks(
        userInfo?.id.toString() ?? "",
      );

      const expenseData = await budgetServices.fetchExpenseGroup(
        userInfo?.id ?? 0,
        today,
      );
      setTasks(data || []);
      setExpenseData(expenseData);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image
            source={require("@/assets/fresh-logo.png")}
            style={{
              width: 42,
              height: 42,
            }}
          />
          <Text style={styles.headerTitle}>Fresh Life</Text>
        </View>
        <View style={styles.groupButton}>
          <Pressable style={styles.notificationIcon}>
            <Ionicons
              name="notifications"
              size={24}
              color={COLORS.colors.primary}
            />
          </Pressable>
          <Pressable style={styles.notificationIcon} onPress={handleLogout}>
            <Ionicons
              name="log-out-outline"
              size={24}
              color={COLORS.colors.primary}
            />
          </Pressable>
        </View>
      </View>

      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <View style={styles.welcomeText}>
          <Text style={styles.greeting}>Hello,</Text>
          <Text style={styles.userName}>{userInfo?.name}</Text>
        </View>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: userInfo?.avatar ?? "" }}
            style={styles.avatar}
            contentFit="cover"
          />
          <View style={styles.avatarBadge}>
            <MaterialCommunityIcons
              name="check-circle"
              size={16}
              color={COLORS.colors.primary}
            />
          </View>
        </View>
      </View>

      {/* Task Progress Section */}
      <View style={styles.sectionContainer}>
        <Title title="Task Progress" />
        <View style={styles.taskProgressCard}>
          <View style={styles.taskProgressContent}>
            <View style={styles.circleProgressContainer}>
              <View
                style={[styles.circleProgress, { width: 140, height: 140 }]}
              >
                <View style={styles.circleProgressText}>
                  <ProgressChart
                    data={data}
                    width={135}
                    height={130}
                    strokeWidth={8}
                    radius={60}
                    chartConfig={chartTasksConfig}
                    hideLegend={true}
                    style={styles.progressChart}
                  />

                  <View style={styles.progressTextContent}>
                    <Text style={styles.progressPercentage}>
                      {percentValue}%
                    </Text>
                    <Text style={styles.progressLabel}>DONE</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.taskStatsContainer}>
              <View style={styles.taskStatItem}>
                <View
                  style={[
                    styles.statDot,
                    { backgroundColor: COLORS.colors.primary },
                  ]}
                />
                <View>
                  <Text style={styles.statLabel}>Done</Text>
                  <Text style={styles.statValue}>{completedTask} Tasks</Text>
                </View>
              </View>

              <View style={styles.taskStatItem}>
                <View
                  style={[
                    styles.statDot,
                    { backgroundColor: COLORS.colors.text.muted },
                  ]}
                />
                <View>
                  <Text style={styles.statLabel}>To Do</Text>
                  <Text style={styles.statValue}>
                    {tasks.length - completedTask} Tasks
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Budget Tracker Section */}
      <View style={styles.sectionContainer}>
        <Title title="Budget Tracker" />
        <LinearGradient
          colors={[COLORS.colors.surfaceLight, COLORS.colors.surface]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.budgetCard}
        >
          {/* Daily Expenses Header */}
          <Text style={styles.budgetLabel}>Daily Usage</Text>

          {/* Amount Display */}
          <View style={styles.amountContainer}>
            <Text
              style={{
                ...styles.amountValue,
                color: isOverBudgetColor,
              }}
            >
              {formatCurrencyVND(expenseData.totalExpenseToday)}
            </Text>
            <Text
              style={{
                ...styles.currencyLabel,
                color: isOverBudgetColor,
              }}
            >
              VND
            </Text>
          </View>

          {/* Budget Today */}
          <Text style={styles.remainingText}>
            Budget Today:{" "}
            <Text style={styles.remainingAmount}>
              {formatCurrencyVND(expenseData.budgetToday)} VND
            </Text>
          </Text>

          {/* Progress Bar */}
          <View style={styles.progressBarContainer}>
            <View
              style={[
                styles.progressBar,
                {
                  width: `${Math.min(Math.round((expenseData.totalExpenseToday / expenseData.budgetToday) * 100), 100)}%`,
                  backgroundColor: isOverBudgetColor,
                },
              ]}
            />
          </View>

          {/* Budget Items */}
          <View style={styles.budgetItemsContainer}>
            <View style={styles.budgetItem}>
              <Text style={styles.budgetItemLabel}>Eating</Text>
              <Text style={styles.budgetItemAmount}>
                {formatCurrencyVND(expenseData.Eating)} VND
              </Text>
            </View>
            <View style={styles.budgetItem}>
              <Text style={styles.budgetItemLabel}>Drink</Text>
              <Text style={styles.budgetItemAmount}>
                {formatCurrencyVND(expenseData.Drink)} VND
              </Text>
            </View>
            <View style={styles.budgetItem}>
              <Text style={styles.budgetItemLabel}>Shopping</Text>
              <Text style={styles.budgetItemAmount}>
                {formatCurrencyVND(expenseData.Shopping)} VND
              </Text>
            </View>
            <View style={styles.budgetItem}>
              <Text style={styles.budgetItemLabel}>Transport</Text>
              <Text style={styles.budgetItemAmount}>
                {formatCurrencyVND(expenseData.Transport)} VND
              </Text>
            </View>
            <View style={styles.budgetItem}>
              <Text style={styles.budgetItemLabel}>Other</Text>
              <Text style={styles.budgetItemAmount}>
                {formatCurrencyVND(expenseData.Other)} VND
              </Text>
            </View>
          </View>
        </LinearGradient>
      </View>
    </ScrollView>
  );
};

export default Home;

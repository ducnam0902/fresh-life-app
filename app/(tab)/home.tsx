import { COLORS } from "@/constants/color";
import { useAuthStore } from "@/store/authStore";
import { useLoadingStore } from "@/store/loadingStore";
import styles from "@/utils/home.style";
import { supabase } from "@/utils/supabase";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import moment from "moment";
import React from "react";
import { Dimensions, Pressable, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { ScrollView } from "react-native-gesture-handler";

const today = moment().format("ddd, MMM DD");

const chartData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      data: [1200000, 1500000, 1300000, 1800000, 1600000, 1400000, 1257500],
      color: () => COLORS.colors.primary,
      strokeWidth: 2,
    },
  ],
};

const Home = () => {
  const { userInfo, setUser } = useAuthStore();
  const { setLoading } = useLoadingStore();
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
        <Text style={styles.sectionTitle}>Task Progress</Text>
        <LinearGradient
          colors={[COLORS.colors.surface, COLORS.colors.surfaceLight]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.taskProgressCard}
        >
          <View style={styles.taskProgressContent}>
            <View style={styles.circleProgressContainer}>
              <View
                style={[styles.circleProgress, { width: 140, height: 140 }]}
              >
                <View
                  style={[
                    styles.circleProgressInner,
                    {
                      width: 120,
                      height: 120,
                      borderTopColor: COLORS.colors.primary,
                      borderRightColor: COLORS.colors.primary,
                      borderBottomColor: COLORS.colors.text.muted,
                      borderLeftColor: COLORS.colors.text.muted,
                    },
                  ]}
                >
                  <View style={styles.circleProgressText}>
                    <Text style={styles.progressPercentage}>{100}%</Text>
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
                  <Text style={styles.statValue}>{10} Tasks</Text>
                </View>
              </View>

              <View style={styles.taskStatItem}>
                <View
                  style={[
                    styles.statDot,
                    { backgroundColor: COLORS.colors.primary },
                  ]}
                />
                <View>
                  <Text style={styles.statLabel}>In Progress</Text>
                  <Text style={styles.statValue}>{3} Tasks</Text>
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
                  <Text style={styles.statValue}>{5} Tasks</Text>
                </View>
              </View>
            </View>
          </View>
        </LinearGradient>
      </View>

      {/* Budget Tracker Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Budget Tracker</Text>
        <LinearGradient
          colors={[COLORS.colors.surface, COLORS.colors.surfaceLight]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.budgetCard}
        >
          <View style={styles.budgetContent}>
            {/* Gauge Chart */}
            <View style={styles.gaugeContainer}>
              <View style={styles.gaugeChart}>
                <View
                  style={[
                    styles.gaugeArc,
                    {
                      borderTopColor: COLORS.colors.primary,
                      borderRightColor: COLORS.colors.primary,
                    },
                  ]}
                />
              </View>
              <View style={styles.gaugeLabel}>
                <Text style={styles.gaugeText}>SAFE ZONE</Text>
              </View>
            </View>

            {/* Budget Info */}
            <View style={styles.budgetInfo}>
              <Text style={styles.budgetTitle}>REMAINING TODAY</Text>
              <Text style={styles.budgetAmount}>
                {(3000 / 1000000).toFixed(1)}.000 VND
              </Text>
              <Text style={styles.budgetSubtext}>
                Daily Expenses:{" "}
                <Text style={styles.budgetExpense}>
                  {(10000 / 1000000).toFixed(1)}/{(138999 / 1000000).toFixed(1)}
                  .000 VND
                </Text>
              </Text>
            </View>
          </View>

          {/* Divider */}
          <View style={styles.budgetDivider} />

          {/* 7-Day Trend */}
          <View style={styles.trendSection}>
            <View style={styles.trendHeader}>
              <Text style={styles.trendLabel}>7-DAY TREND</Text>
              <View style={styles.trendValue}>
                <MaterialCommunityIcons
                  name="trending-up"
                  size={16}
                  color={COLORS.colors.primary}
                />
                <Text style={styles.trendPercent}>+{10}%</Text>
              </View>
            </View>

            <LineChart
              data={chartData}
              width={Dimensions.get("window").width - 80}
              height={100}
              chartConfig={{
                backgroundColor: "transparent",
                backgroundGradientFrom: "transparent",
                backgroundGradientTo: "transparent",
                color: () => COLORS.colors.text.muted,
                strokeWidth: 2,
                useShadowColorFromDataset: false,
              }}
              style={styles.lineChart}
              withDots={false}
              withInnerLines={false}
              withOuterLines={false}
            />
          </View>
        </LinearGradient>
      </View>
    </ScrollView>
  );
};

export default Home;

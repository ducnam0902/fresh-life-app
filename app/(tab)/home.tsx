import ProgressBar from "@/components/ProgressBar";
import { COLORS } from "@/constants/color";
import { useAuthStore } from "@/store/authStore";

import styles from "@/utils/home.style";
import Ionicons from "@expo/vector-icons/Ionicons";

import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import moment from "moment";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const today = moment().format("ddd, MMM DD");

const Home = () => {
  const { userInfo } = useAuthStore();
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.homeContainer}>
        <View style={styles.notiContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={{ uri: userInfo?.avatar ?? "" }}
              style={styles.avatar}
              contentFit="contain"
            />
            <View>
              <Text style={styles.title}>Good Morning</Text>
              <Text style={styles.subTitle}>{userInfo?.name}! 👋</Text>
            </View>
          </View>
          <View style={styles.notiIcon}>
            <Ionicons name="notifications" size={30} color="black" />
          </View>
        </View>

        <Text style={styles.today}>{today}</Text>

        <View style={styles.overviewContainer}>
          <View style={styles.todayRemaining}>
            <Text style={styles.remainingTitle}>Today&apos; Remaining</Text>
            <Text style={styles.remeiningValue}>85.500 VND</Text>
          </View>

          <View style={styles.budgetToday}>
            <View>
              <Text style={styles.budgetLimitTitle}>Budget Limit</Text>
              <Text style={styles.budgetLimitValue}>130.000 VND</Text>
            </View>
            <View style={styles.verticalLine}></View>
            <View>
              <Text style={styles.spentTodayTitle}>Spent Today</Text>
              <Text style={styles.spentTodayValue}>-44.500 VND</Text>
            </View>
          </View>
          <View style={styles.horizontalLine}></View>

          <View style={styles.dailyUsageContainer}>
            <View style={styles.dailyUsageSection}>
              <Text style={styles.dailyUsageTitle}>Daily Usage</Text>
              <Text style={styles.dailyUsageValue}>60%</Text>
            </View>

            <ProgressBar activePercents={"60%"} />
          </View>
        </View>

        <View style={styles.buttonGroup}>
          <Pressable style={styles.button}>
            <Link href="/(modal)/addTask">
              {" "}
              <Ionicons
                name="add-circle-outline"
                size={24}
                color={COLORS.textMain}
              />
              <Text style={styles.buttonTitle}>Add Task</Text>{" "}
            </Link>
          </Pressable>

          <Pressable style={[styles.button, styles.transactionButton]}>
            <Ionicons name="card-outline" size={24} color={COLORS.textMain} />
            <Text style={styles.buttonTitle}>Transaction</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;

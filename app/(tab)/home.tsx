import { COLORS } from "@/constants/color";
import { useAuthStore } from "@/store/authStore";

import styles from "@/utils/home.style";
import Ionicons from "@expo/vector-icons/Ionicons";

import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import moment from "moment";
import React from "react";
import { Pressable, Text, View } from "react-native";

const today = moment().format("ddd, MMM DD");

const Home = () => {
  const { userInfo } = useAuthStore();
  return (
    <View style={styles.homeContainer}>
      <View style={styles.notiContainer}>
        <View style={styles.welcomeContainer}>
          <Image source={{ uri: userInfo?.avatar ?? '' }} style={styles.avatar} contentFit="contain"/>
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

          <View style={styles.slideContainer}>
            <View style={styles.slideStatus}></View>
            <LinearGradient
              // Button Linear Gradient
              colors={[COLORS.primary, COLORS.third]}
              style={{
                ...styles.activeSlide,
                width: "60%",
              }}
              start={{ x: 0, y: 0 }} // Start at the top left
              end={{ x: 1, y: 0 }} // End at the top right
            ></LinearGradient>
          </View>
        </View>
      </View>

      <View style={styles.buttonGroup}>
        <Pressable style={styles.button}>
          <Ionicons name="add-circle-outline" size={24} color={COLORS.textMain}/>
          <Text style={styles.buttonTitle}>Add Task</Text>
        </Pressable>
        <Pressable style={[styles.button, styles.transactionButton]}>
          <Ionicons name="card-outline" size={24} color={COLORS.textMain}/>
          <Text style={styles.buttonTitle}>Transaction</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Home;

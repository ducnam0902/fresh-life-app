import Header from "@/components/Header";
import Title from "@/components/Title";
import { COLORS } from "@/constants/color";
import styles from "@/utils/schedule.style";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, Text, View } from "react-native";

export default function ScheduleScreen() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Header link="/(modal)/addSchedule" />
        <Title title="My Schedule" />
        {/* SUMMARY CARD */}
        <View style={styles.summaryCard}>
          <View>
            <Text style={styles.summaryLabel}>TOTAL RUNNING SCHEDULES</Text>
            <View style={styles.activeCountRow}>
              <Text style={styles.activeNumber}>12</Text>
              <Text style={styles.activeText}>active</Text>
            </View>
          </View>
          <View style={styles.summaryIconContainer}>
            <MaterialCommunityIcons
              name="calendar-refresh"
              size={32}
              color={COLORS.colors.primary}
            />
          </View>
        </View>

         <Title title="Reccuring" />

        {/* SCHEDULE CARDS */}
        <ScheduleCard
          title="Quarterly Global Strategy Planning and Team Alignment..."
          tag="WORK"
          priority="HIGH PRIORITY"
          priorityColor={COLORS.colors.error}
          time="10:00 AM • Starts 24-10-2023"
          recurrence="Daily • Repeat every day"
        />

        <ScheduleCard
          title="Development Sync"
          tag="DEVELOPMENT"
          priority="MEDIUM"
          priorityColor={COLORS.colors.warning}
          time="02:30 PM • Starts 24-10-2023"
          recurrence="Weekly • Repeat on Mon, Wed"
        />
      </ScrollView>
    </View>
  );
}

// Sub-component for individual cards
function ScheduleCard({
  title,
  tag,
  priority,
  priorityColor,
  time,
  recurrence,
}: any) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle} numberOfLines={2}>
          {title}
        </Text>
        <Ionicons
          name="ellipsis-horizontal"
          size={20}
          color={COLORS.colors.text.secondary}
        />
      </View>

      <View style={styles.tagContainer}>
        <Text style={styles.tagText}>{tag}</Text>
      </View>

      <Text style={[styles.priorityText, { color: priorityColor }]}>
        {priority}
      </Text>

      <View style={styles.infoRow}>
        <Ionicons
          name="time-outline"
          size={16}
          color={COLORS.colors.text.secondary}
        />
        <Text style={styles.infoText}>{time}</Text>
      </View>

      <View style={styles.infoRow}>
        <MaterialCommunityIcons
          name="repeat"
          size={16}
          color={COLORS.colors.primary}
        />
        <Text style={[styles.infoText, { color: COLORS.colors.primary }]}>
          {recurrence}
        </Text>
      </View>
    </View>
  );
}

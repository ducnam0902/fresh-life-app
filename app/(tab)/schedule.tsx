import Header from "@/components/Header";
import Title from "@/components/Title";
import { COLORS } from "@/constants/color";
import styles from "@/styles/schedule.style";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, Pressable, Text, View } from "react-native";

const schedules = [
  {
    id: "1",
    title: "Quarterly Global Strategy Planning and Team Alignment ",
    tag: "WORK",
    priority: "HIGH PRIORITY",
    priorityColor: COLORS.colors.error,
    time: "10:00 AM • Starts 24-10-2023",
    recurrence: "Daily • Repeat every day",
  },
  {
    id: "2",
    title: "Development Sync",
    tag: "DEVELOPMENT",
    priority: "MEDIUM PRIORITY",
    priorityColor: COLORS.colors.warning,
    time: "02:30 PM • Starts 24-10-2023",
    recurrence: "Weekly • Repeat on Mon, Wed",
  },
  {
    id: "3",
    title: "Monthly Review",
    tag: "FINANCE",
    priority: "LOW PRIORITY",
    priorityColor: COLORS.colors.aqua,
    time: "09:00 AM • Starts 24-10-2023",
    recurrence: "Monthly • Repeat on the 5th",
  },
];

export default function ScheduleScreen() {
  const router = useRouter();
  const renderScheduleCard = (itemData: any) => {
    const item = itemData.item;
    const { title, tag, priorityColor, priority, time, recurrence } = item;

    const handleViewDetails = (id: string) => {
      router.push({
        pathname: "/(screens)/ScheduleDetails/[id]",
        params: { id },
      });
    };

    return (
      <Pressable style={styles.card} onPress={() => handleViewDetails(item.id)}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{title}</Text>
          <View style={styles.tagContainer}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        </View>

        <View style={styles.groupItem}>
          <View style={styles.infoRow}>
            <Ionicons
              name="time-outline"
              size={16}
              color={COLORS.colors.text.secondary}
            />
            <Text style={styles.infoText}>{time}</Text>
          </View>
          <Text style={[styles.priorityText, { color: priorityColor }]}>
            {priority}
          </Text>
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
      </Pressable>
    );
  };

  const ListHeaderComponent = () => (
    <View>
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
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={schedules}
        renderItem={renderScheduleCard}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<ListHeaderComponent />}
      />
    </View>
  );
}

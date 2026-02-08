import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { COLORS } from "@/constants/color";
import { DailyExpenses, getTagColorExpense } from "@/utils/budgetUtils";
import budgetServices from "@/services/budgetServices";
import { Ionicons } from "@expo/vector-icons";
import styles from "@/styles/expenseDetails.style";
import Toast from "react-native-toast-message";
import { useLoadingStore } from "@/store/loadingStore";
import moment from "moment";
import ModalHeader from "@/components/ModalHeader";

export default function ExpenseDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [expense, setExpense] = useState<DailyExpenses | null>(null);
  const { setLoading } = useLoadingStore();

  useEffect(() => {
    fetchExpenseDetails();
  }, [id]);

  const fetchExpenseDetails = async () => {
    try {
      setLoading(true);
      const data = await budgetServices.fetchExpensesById(Number(id));
      setExpense(data);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to load expense details",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("vi-VN", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  if (!expense) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Expense not found</Text>
      </View>
    );
  }

  const tagColor = getTagColorExpense(expense.tag);

  return (
    <View style={styles.container}>
      <ModalHeader title="Expense Details" onCancel={() => router.back()} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Amount Card */}
        <View style={styles.amountCard}>
          <View style={[styles.tagBadge, { backgroundColor: tagColor }]}>
            <Text style={styles.tagText}>{expense.tag.toUpperCase()}</Text>
          </View>
          <Text style={styles.amountText}>
            {formatCurrency(expense.amount)}{" "}
            <Text style={styles.currencyText}>VND</Text>
          </Text>
        </View>

        {/* Expense Title */}
        <View style={styles.detailsSection}>
          <Text style={styles.expenseTitle}>{expense.name}</Text>
          {expense.reason.length > 0 && (
            <Text style={styles.expenseReason}>{}</Text>
          )}
        </View>

        {/* Date */}
        <View style={styles.dateSection}>
          <Ionicons
            name="calendar-outline"
            size={20}
            color={COLORS.colors.text.secondary}
          />
          <View style={styles.dateInfo}>
            <Text style={styles.dateLabel}>DATE</Text>
            <Text style={styles.dateValue}>
              {moment(expense.date, "DD-MM-YYYY").format("dddd, MMM Do YYYY ")}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

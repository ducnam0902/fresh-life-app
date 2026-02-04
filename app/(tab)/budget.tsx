import { useAuthStore } from "@/store/authStore";
import budgetServices from "@/services/budgetServices";
import React, { useEffect, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import moment from "moment";
import { Link, useRouter } from "expo-router";
import { useLoadingStore } from "@/store/loadingStore";
import styles from "@/utils/budget.styles";
import {
  BudgetPeriod,
  DailyExpenses,
  formatCurrencyVND,
  getTagColorExpense,
} from "@/utils/budgetUtils";
import { Image } from "expo-image";
import { COLORS } from "@/constants/color";
import { Ionicons } from "@expo/vector-icons";
import { getTagColor } from "@/utils/tasksUtils";
import Header from "@/components/Header";
import { ScrollView } from "react-native-gesture-handler";
import Title from "@/components/Title";

const todayDate = moment().format("DD-MM-YYYY");

const Budget = () => {
  const userInfo = useAuthStore((state) => state.userInfo);
  const [budgetPeriod, setBudgetPeriod] = useState<BudgetPeriod | null>(null);
  const [expenses, setExpenses] = useState<DailyExpenses[]>([]);
  const { setLoading } = useLoadingStore();
  const totalExpensesToday = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0,
  );
  const remainingExpenseToday =
    (budgetPeriod?.amount ?? 0) - totalExpensesToday;
  const isOverBudgetToday = budgetPeriod?.amount
    ? totalExpensesToday > budgetPeriod?.amount
    : false;
  const router = useRouter();
  const fetchBudgetPeriods = async () => {
    try {
      setLoading(true);
      const data = await budgetServices.checkBudgetPeriod(
        userInfo?.id ?? 0,
        todayDate,
      );
      if (data.length === 0) {
        router.push("/BudgetPeriod");
        return;
      }

      setBudgetPeriod(data[0]);

      const expensesTodayList = await budgetServices.fetchExpenseToday(
        userInfo?.id ?? 0,
        todayDate,
      );

      setExpenses(expensesTodayList || []);
    } catch (error) {
      console.error("Error fetching budget periods:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBudgetPeriods();
  }, []);

  const calculateUsagePercentage = (): number => {
    if (!budgetPeriod) return 0;
    return Math.round((totalExpensesToday / budgetPeriod.amount) * 100);
  };

  const ListHeaderComponent = () => (
    <View style={styles.header}>
        <Header link="/(modal)/addExpense" />
        <Title title="My Budget" />
      {/* Budget Summary Card */}
      <View style={styles.budgetSummaryCard}>
        <View style={styles.budgetStats}>
          <View style={styles.statColumn}>
            <Text style={styles.statLabel}>REMAINING</Text>
            <View style={styles.remainingContainer}>
              <Text
                style={{
                  ...styles.remainingAmount,
                  color: isOverBudgetToday
                    ? COLORS.colors.error
                    : COLORS.colors.primary,
                }}
              >
                {formatCurrencyVND(remainingExpenseToday)}
              </Text>
              <Text style={styles.statCurrency}>VND</Text>
            </View>
          </View>

          <View style={styles.verticalDivider} />

          <View style={styles.statColumn}>
            <Text style={styles.statLabel}>TODAY BUDGET</Text>
            <View style={styles.budgetContainer}>
              <Text style={styles.budgetAmount}>
                {formatCurrencyVND(budgetPeriod?.amount ?? 0)}
              </Text>
              <Text style={styles.statCurrency}>VND</Text>
            </View>
          </View>
        </View>

        <View style={styles.usageSection}>
          <View style={styles.usageHeader}>
            <Text style={styles.usageLabel}>USAGE</Text>
            <Text
              style={{
                ...styles.usagePercentage,
                color: isOverBudgetToday
                  ? COLORS.colors.error
                  : COLORS.colors.primary,
              }}
            >
              {calculateUsagePercentage()}%
            </Text>
          </View>
          <View style={styles.progressBarContainer}>
            <View
              style={[
                styles.progressBar,
                {
                  width: `${Math.min(calculateUsagePercentage(), 100)}%`,
                  backgroundColor: isOverBudgetToday
                    ? COLORS.colors.error
                    : COLORS.colors.primary,
                },
              ]}
            />
          </View>
        </View>
      </View>

      <Title title="Recent Activity" />
    </View>
  );

  const handleViewExpense = (expense: DailyExpenses) => {
    router.push({
      pathname: "/(screens)/ExpenseDetails/[id]",
      params: { id: expense.id?.toString() || "" },
    });
  };

  const renderExpenseItem = ({ item }: { item: DailyExpenses }) => (
    <Pressable
      style={styles.expenseItem}
      onPress={() => handleViewExpense(item)}
    >
      <View style={styles.expenseContent}>
        <View style={styles.expenseTextContainer}>
          <Text style={styles.expenseName}>{item.name}</Text>
          {item.reason.length > 0 && (
            <Text style={styles.expenseReason}>{item.reason}</Text>
          )}
        </View>
        <View>
          <Text style={styles.expenseAmount}>
            {item.amount.toLocaleString()} VND
          </Text>
          <View style={styles.expenseAmountContainer}>
            <View
              style={[
                styles.expenseTagBadge,
                { backgroundColor: `${getTagColorExpense(item.tag)}20` },
              ]}
            >
              <Text
                style={[
                  styles.expenseTagText,
                  { color: getTagColorExpense(item.tag) },
                ]}
              >
                {item.tag}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={expenses}
        renderItem={renderExpenseItem}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        ListHeaderComponent={ListHeaderComponent}
        contentContainerStyle={styles.flatListContainer}
        scrollEnabled={true}
        ListEmptyComponent={
          budgetPeriod ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No expenses yet</Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default Budget;

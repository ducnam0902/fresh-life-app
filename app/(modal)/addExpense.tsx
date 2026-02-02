import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import moment from "moment";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import styles from "@/utils/addExpense.style";
import { COLORS } from "@/constants/color";
import { useAuthStore } from "@/store/authStore";
import { useLoadingStore } from "@/store/loadingStore";
import budgetServices from "@/utils/budgetServices";
import { DailyExpenses } from "@/utils/budgetUtils";
import Toast from "react-native-toast-message";
import { formatCurrencyVND } from "../../utils/budgetUtils";

const expenseCategories = ["Eating", "Drink", "Transport", "Shopping", "Other"];

const expenseSchema = z.object({
  name: z
    .string()
    .min(1, "Expense name is required")
    .min(3, "Name must be at least 3 characters"),
  reason: z.string().optional(),
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine(
      (val) => !isNaN(parseFloat(val.replace(/\./g, "").replace(/,/g, "."))),
      "Please enter a valid amount",
    ),
  tag: z.enum(expenseCategories as [string, ...string[]]),
});

type ExpenseFormData = z.infer<typeof expenseSchema>;

const AddExpenseModal = () => {
  const router = useRouter();
  const { userInfo } = useAuthStore();
  const { setLoading } = useLoadingStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    reset,
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      name: "",
      reason: "",
      amount: "10.000",
      tag: expenseCategories[0],
    },
  });

  const formatCurrency = (value: string): string => {
    const numericValue = value.replace(/\D/g, "");
    if (!numericValue) return "";
    return formatCurrencyVND(Number(numericValue));
  };

  const handleAmountChange = (value: string) => {
    const formatted = formatCurrency(value);
    setValue("amount", formatted);
  };

  const onSubmit = async (data: ExpenseFormData) => {
    try {
      setIsSubmitting(true);
      setLoading(true);

      // Parse amount (remove dots and convert to number)
      const amountValue = parseFloat(
        data.amount.replace(/\./g, "").replace(/,/g, "."),
      );

      const expensePayload: DailyExpenses = {
        name: data.name,
        reason: data.reason || "",
        amount: amountValue,
        tag: data.tag,
        date: moment().format("DD-MM-YYYY"),
        user_id: userInfo?.id ?? 0,
      };

      await budgetServices.createExpense(expensePayload);

      Toast.show({
        type: "success",
        text1: "Expense added successfully!",
      });
      reset();
      router.replace("/budget");
    } catch (error: any) {
      console.error("Error adding expense:", error);
      Toast.show({
        type: "error",
        text1: "Error adding expense",
        text2: error.message || "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };

  const handleCancel = () => {
    reset();
    router.back();
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.headerContainer}>
          <Pressable onPress={handleCancel} style={styles.backButton}>
            <Ionicons
              name="chevron-back"
              size={28}
              color={COLORS.colors.text.primary}
            />
          </Pressable>
          <Text style={styles.headerTitle}>Add Expense</Text>
          <View style={{ width: 28 }} />
        </View>

        {/* Expense Name */}
        <View style={styles.formSection}>
          <Text style={styles.fieldLabel}>Expense Name</Text>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <TextInput
                  style={styles.textInput}
                  placeholder="e.g. Morning Coffee"
                  placeholderTextColor={COLORS.colors.text.muted}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
                {errors.name && (
                  <Text style={styles.errorText}>{errors.name.message}</Text>
                )}
              </>
            )}
          />
        </View>

        {/* Reason */}
        <View style={styles.formSection}>
          <Text style={styles.fieldLabel}>Reason</Text>
          <Controller
            control={control}
            name="reason"
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <TextInput
                  style={styles.textInput}
                  placeholder="e.g. Breakfast"
                  placeholderTextColor={COLORS.colors.text.muted}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
                {errors.reason && (
                  <Text style={styles.errorText}>{errors.reason.message}</Text>
                )}
              </>
            )}
          />
        </View>

        {/* Amount */}
        <View style={styles.formSection}>
          <Text style={styles.fieldLabel}>Amount</Text>
          <Controller
            control={control}
            name="amount"
            render={({ field: { value } }) => (
              <>
                <View style={styles.amountContainer}>
                  <TextInput
                    style={styles.amountInput}
                    placeholder="0"
                    placeholderTextColor={COLORS.colors.text.muted}
                    value={value}
                    onChangeText={handleAmountChange}
                    keyboardType="numeric"
                  />
                  <Text style={styles.currencyLabel}>VND</Text>
                </View>
                {errors.amount && (
                  <Text style={styles.errorText}>{errors.amount.message}</Text>
                )}
              </>
            )}
          />
        </View>

        {/* Category Selection */}
        <View style={styles.formSection}>
          <Text style={styles.categoryLabel}>CATEGORY</Text>
          <Controller
            control={control}
            name="tag"
            render={({ field: { onChange, value } }) => (
              <View style={styles.categoryButtonsContainer}>
                {expenseCategories.map((category) => (
                  <Pressable
                    key={category}
                    style={[
                      styles.categoryButton,
                      value === category && styles.categoryButtonSelected,
                    ]}
                    onPress={() => onChange(category)}
                  >
                    <Text
                      style={[
                        styles.categoryButtonText,
                        value === category && styles.categoryButtonTextSelected,
                      ]}
                    >
                      {category}
                    </Text>
                  </Pressable>
                ))}
              </View>
            )}
          />
        </View>

        {/* Spacer */}
        <View style={styles.spacer} />

        {/* Add Expense Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.addExpenseButton,
              isSubmitting && styles.addExpenseButtonDisabled,
            ]}
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            activeOpacity={0.8}
          >
            {isSubmitting ? (
              <ActivityIndicator
                size="small"
                color={COLORS.colors.text.onPrimary}
              />
            ) : (
              <Text style={styles.addExpenseButtonText}>Add Expense</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default AddExpenseModal;

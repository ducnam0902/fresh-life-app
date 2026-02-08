import { COLORS } from "@/constants/color";
import { useAuthStore } from "@/store/authStore";
import { useLoadingStore } from "@/store/loadingStore";
import styles from "@/styles/budgetPeriod.style";
import budgetServices from "@/services/budgetServices";
import { BudgetPeriod } from "@/utils/budgetUtils";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import moment from "moment";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import * as z from "zod";
import { formatCurrencyVND } from "../../../utils/budgetUtils";

const budgetSchema = z.object({
  name: z.string().min(1, "Budget name is required"),
  startDate: z
    .string()
    .refine(
      (val) => !val || /^\w+\s\d{2},\s\d{4}$/.test(val),
      "Start date is required",
    ),
  endDate: z
    .string()
    .refine(
      (val) => !val || /^\w+\s\d{2},\s\d{4}$/.test(val),
      "End date is required",
    ),
  amount: z.string().min(1, "Budget amount is required"),
});

type BudgetFormData = z.infer<typeof budgetSchema>;

const BudgetPeriodScreen = () => {
  const router = useRouter();
  const { userInfo } = useAuthStore();
  const { setLoading } = useLoadingStore();
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm<BudgetFormData>({
    resolver: zodResolver(budgetSchema),
    defaultValues: {
      name: "",
      startDate: moment().format("MMM DD, YYYY"),
      endDate: moment().endOf("month").format("MMM DD, YYYY"),
      amount: "100.000",
    },
  });

  const handleStartDateChange = (event: any, selectedDate: any) => {
    if (event.type === "dismissed") {
      setShowStartDatePicker(false);
      return;
    }

    if (selectedDate) {
      const formattedDate = moment(selectedDate).format("MMM DD, YYYY");
      setValue("startDate", formattedDate);
    }
    setShowStartDatePicker(false);
  };

  const handleEndDateChange = (event: any, selectedDate: any) => {
    if (event.type === "dismissed") {
      setShowEndDatePicker(false);
      return;
    }

    if (selectedDate) {
      const formattedDate = moment(selectedDate).format("MMM DD, YYYY");
      setValue("endDate", formattedDate);
    }
    setShowEndDatePicker(false);
  };

  const onSubmit = async (data: BudgetFormData) => {
    try {
      setIsSubmitting(true);
      setLoading(true);

      const startDateObj = moment(data.startDate, "MMM DD, YYYY");
      const endDateObj = moment(data.endDate, "MMM DD, YYYY");

      const amountValue = parseFloat(
        data.amount.replace(/\./g, "").replace(/,/g, "."),
      );

      const budgetPayload: BudgetPeriod = {
        name: data.name,
        start_date: startDateObj.format("DD-MM-YYYY"),
        end_date: endDateObj.format("DD-MM-YYYY"),
        amount: amountValue,
        user_id: userInfo?.id ? userInfo.id : 0,
      };

      await budgetServices.setBudget(budgetPayload);
      Toast.show({
        type: "success",
        text1: "Budget saved successfully!",
      });
      router.replace("/(tab)/budget");
    } catch (error: any) {
      console.error("Error saving budget:", error);
      Toast.show({
        type: "error",
        text1: error.message || "Failed to save budget",
      });
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };

  const handleOnChangeAmount = (text: string) => {
    // Remove all non-digit characters
    const numericValue = text.replace(/\D/g, "");

    // Format number with dots as thousand separators
    const formattedValue = formatCurrencyVND(Number(numericValue));
    return formattedValue;
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <Pressable
            onPress={() => router.replace("/(tab)/home")}
            style={styles.backButton}
          >
            <Ionicons
              name="chevron-back"
              size={28}
              color={COLORS.colors.text.primary}
            />
          </Pressable>
          <Text style={styles.headerTitle}>Set Budget</Text>
          <View style={{ width: 28 }} />
        </View>

        {/* Period Name */}
        <View style={styles.formSection}>
          <Text style={styles.sectionLabel}>PERIOD NAME</Text>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Enter a Period Name"
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

        {/* Timeline Section */}
        <View style={styles.formSection}>
          <Text style={styles.sectionLabel}>TIMELINE</Text>

          {/* Start Date */}
          <Controller
            control={control}
            name="startDate"
            render={({ field: { value } }) => (
              <>
                <Pressable
                  style={styles.dateContainer}
                  onPress={() => setShowStartDatePicker(true)}
                >
                  <MaterialCommunityIcons
                    name="calendar"
                    size={20}
                    color={COLORS.colors.primary}
                    style={styles.dateIcon}
                  />
                  <Text style={styles.dateLabel}>Start Date</Text>
                  <Text style={styles.dateValue}>{value}</Text>
                </Pressable>
                {errors.startDate && (
                  <Text style={styles.errorText}>
                    {errors.startDate.message}
                  </Text>
                )}
              </>
            )}
          />

          {showStartDatePicker && (
            <DateTimePicker
              value={
                getValues("startDate")
                  ? moment(getValues("startDate"), "MMM DD, YYYY").toDate()
                  : new Date()
              }
              mode="date"
              display="default"
              onChange={handleStartDateChange}
            />
          )}

          {/* End Date */}
          <Controller
            control={control}
            name="endDate"
            render={({ field: { value } }) => (
              <>
                <Pressable
                  style={styles.dateContainer}
                  onPress={() => setShowEndDatePicker(true)}
                >
                  <MaterialCommunityIcons
                    name="calendar"
                    size={20}
                    color={COLORS.colors.primary}
                    style={styles.dateIcon}
                  />
                  <Text style={styles.dateLabel}>End Date</Text>
                  <Text style={styles.dateValue}>{value}</Text>
                </Pressable>
                {errors.endDate && (
                  <Text style={styles.errorText}>{errors.endDate.message}</Text>
                )}
              </>
            )}
          />

          {showEndDatePicker && (
            <DateTimePicker
              value={
                getValues("endDate")
                  ? moment(getValues("endDate"), "MMM DD, YYYY").toDate()
                  : new Date()
              }
              mode="date"
              display="default"
              onChange={handleEndDateChange}
            />
          )}
        </View>

        {/* Budget Amount */}
        <View style={styles.formSection}>
          <Text style={styles.sectionLabel}>BUDGET AMOUNT</Text>
          <Controller
            control={control}
            name="amount"
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <View style={styles.amountContainer}>
                  <TextInput
                    style={styles.amountInput}
                    placeholder="0"
                    placeholderTextColor={COLORS.colors.text.muted}
                    value={value}
                    onChangeText={(text: string) =>
                      onChange(handleOnChangeAmount(text))
                    }
                    onBlur={onBlur}
                    keyboardType="numeric"
                  />
                  <Text style={styles.amountCurrency}>VND</Text>
                </View>
                {errors.amount && (
                  <Text style={styles.errorText}>{errors.amount.message}</Text>
                )}
              </>
            )}
          />
        </View>

        {/* Info Banner */}
        <View style={styles.infoBanner}>
          <MaterialCommunityIcons
            name="information"
            size={20}
            color={COLORS.colors.primary}
            style={styles.infoIcon}
          />
          <Text style={styles.infoBannerText}>
            Setting a budget helps you save up to{" "}
            <Text style={styles.infoBannerHighlight}>15%</Text> more per month
            based on your spending habits.
          </Text>
        </View>

        {/* Spacer */}
        <View style={styles.spacer} />

        {/* Save Budget Button */}
        <View style={styles.buttonContainer}>
          <Pressable
            style={[
              styles.saveBudgetButton,
              isSubmitting && styles.saveBudgetButtonDisabled,
            ]}
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator
                size="small"
                color={COLORS.colors.text.onPrimary}
              />
            ) : (
              <>
                <Text style={styles.saveBudgetButtonText}>Save Budget</Text>
                <MaterialCommunityIcons
                  name="check-circle"
                  size={20}
                  color={COLORS.colors.text.onPrimary}
                  style={styles.checkIcon}
                />
              </>
            )}
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default BudgetPeriodScreen;

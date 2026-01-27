import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import React, { useState } from "react";
import Toast from "react-native-toast-message";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";
import styles from "@/utils/addTask.style";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "@/constants/color";
import { useRouter } from "expo-router";
import { supabase } from "@/utils/supabase";
import { useAuthStore } from "../../store/authStore";
import { useLoadingStore } from "@/store/loadingStore";

const tagOptions = [
  "Personal",
  "Work",
  "Health",
  "Shopping",
  "Development",
  "Finance",
];
const priorityOptions = ["Low", "Medium", "High"];

// Zod validation schema
const taskSchema = z.object({
  taskName: z
    .string()
    .min(1, "Task name is required")
    .min(3, "Task name must be at least 3 characters"),
  tag: z.enum(tagOptions),
  priority: z.enum(priorityOptions),
  dueDate: z
    .string()
    .refine(
      (val) => !val || /^\d{2}\/\d{2}\/\d{4}$/.test(val),
      "Due date must be in DD/MM/YYYY format"
    )
    .refine((val) => {
      if (!val) return true;
      const [day, month, year] = val.split("/").map(Number);
      const date = new Date(year, month - 1, day);
      return (
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day
      );
    }, "Please enter a valid date"),
  estimatedTime: z.string(),
});

type TaskFormData = z.infer<typeof taskSchema>;

// Format date input as user types (DD/MM/YYYY)
const formatDateInput = (text: string): string => {
  // Remove all non-numeric characters
  const cleaned = text.replace(/\D/g, "");

  // Format as DD/MM/YYYY
  if (cleaned.length <= 2) {
    return cleaned;
  } else if (cleaned.length <= 4) {
    return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
  } else {
    return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(
      4,
      8
    )}`;
  }
};

const AddTaskModal = () => {
  const router = useRouter();
  const { userInfo } = useAuthStore();
  const { setLoading } = useLoadingStore();
  // Date and Time picker states
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    setValue,
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      taskName: "",
      tag: tagOptions[1],
      priority: priorityOptions[1],
      dueDate: moment().format("DD/MM/YYYY"),
      estimatedTime: "20:00",
    },
  });

  // Handle date picker change
  const handleDateChange = (event: any, selectedDate: any) => {
    if (event.type === "dismissed") {
      setShowDatePicker(false);
      return;
    }

    if (selectedDate) {
      const day = String(selectedDate.getDate()).padStart(2, "0");
      const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
      const year = selectedDate.getFullYear();
      const formattedDate = `${day}/${month}/${year}`;
      setValue("dueDate", formattedDate);
    }
    setShowDatePicker(false);
  };

  // Handle time picker change
  const handleTimeChange = (event: any, selectedTime: any) => {
    if (event.type === "dismissed") {
      setShowTimePicker(false);
      return;
    }

    if (selectedTime) {
      const hours = String(selectedTime.getHours()).padStart(2, "0");
      const minutes = String(selectedTime.getMinutes()).padStart(2, "0");
      const formattedTime = `${hours}:${minutes}`;
      setValue("estimatedTime", formattedTime);
    }
    setShowTimePicker(false);
  };

  const onSubmit = async (data: TaskFormData) => {
    try {
      setLoading(true);
      // Insert task data into tasks table
      const { data: insertedData, error: insertError } = await supabase
        .from("Tasks")
        .insert([
          {
            user_id: userInfo?.id,
            task_name: data.taskName,
            tag: data.tag,
            priority: data.priority,
            due_date: data.dueDate,
            estimated_time: data.estimatedTime,
          },
        ])
        .select();

      if (insertError) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: `Failed to create task: ${insertError.message}`,
        });
        return;
      }
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Task added successfully!",
      });
      reset();
      router.push("/(tab)/tasks");
    } catch (error) {
      console.error("Error submitting task:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "An unexpected error occurred",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.back();
    reset();
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.headerTitle}>
        <Pressable onPress={handleCancel} style={styles.backButton}>
          <Ionicons
            name="chevron-back"
            size={28}
            color={COLORS.colors.text.primary}
          />
        </Pressable>
        <Text style={styles.newTaskTitle}>New Task</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* Task Name Input */}
      <View style={styles.formSection}>
        <Text style={styles.sectionLabel}>TASK NAME</Text>
        <Controller
          control={control}
          name="taskName"
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInput
                style={styles.taskNameInput}
                placeholder="What do you want to accomplish?"
                placeholderTextColor={COLORS.colors.text.secondary}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
              {errors.taskName && (
                <Text style={styles.errorText}>{errors.taskName.message}</Text>
              )}
            </>
          )}
        />
      </View>

      {/* Category/Tag Selection */}
      <View style={styles.formSection}>
        <Text style={styles.sectionLabel}>CATEGORY</Text>
        <Controller
          control={control}
          name="tag"
          render={({ field: { onChange, value } }) => (
            <View style={styles.tagButtonsContainer}>
              {tagOptions.map((option) => (
                <Pressable
                  key={option}
                  style={[
                    styles.tagButton,
                    value === option && styles.tagButtonSelected,
                  ]}
                  onPress={() => onChange(option)}
                >
                  <Text
                    style={[
                      styles.tagButtonText,
                      value === option && styles.tagButtonTextSelected,
                    ]}
                  >
                    {option}
                  </Text>
                </Pressable>
              ))}
            </View>
          )}
        />
      </View>

      {/* Priority Selection */}
      <View style={styles.formSection}>
        <Text style={styles.sectionLabel}>PRIORITY</Text>
        <Controller
          control={control}
          name="priority"
          render={({ field: { onChange, value } }) => (
            <View style={styles.priorityButtonsContainer}>
              {priorityOptions.map((option) => (
                <Pressable
                  key={option}
                  style={[
                    styles.priorityButton,
                    value === option && styles.priorityButtonSelected,
                  ]}
                  onPress={() => onChange(option)}
                >
                  <Text
                    style={[
                      styles.priorityButtonText,
                      value === option && styles.priorityButtonTextSelected,
                    ]}
                  >
                    {option}
                  </Text>
                </Pressable>
              ))}
            </View>
          )}
        />
      </View>

      {/* Due Date & Time Section */}
      <View style={styles.formSection}>
        <Text style={styles.sectionLabel}>DUE DATE & TIME</Text>

        {/* Due Date */}
        <Controller
          control={control}
          name="dueDate"
          render={({ field: { value } }) => (
            <>
              <Pressable
                style={styles.dueDateContainer}
                onPress={() => setShowDatePicker(true)}
              >
                <MaterialCommunityIcons
                  name="calendar"
                  size={20}
                  color={COLORS.colors.primary}
                  style={styles.dateIcon}
                />
                <Text style={styles.dueDateText}>
                  {value
                    ? `${moment(value, "DD/MM/YYYY").format("ddd, MMM DD")}`
                    : "Select date"}
                </Text>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={COLORS.colors.text.secondary}
                  style={styles.chevronIcon}
                />
              </Pressable>
              {errors.dueDate && (
                <Text style={styles.errorText}>{errors.dueDate.message}</Text>
              )}
            </>
          )}
        />

        {showDatePicker && (
          <DateTimePicker
            value={
              getValues("dueDate")
                ? new Date(getValues("dueDate").split("/").reverse().join("-"))
                : new Date()
            }
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        {/* Estimated Time */}
        <Controller
          control={control}
          name="estimatedTime"
          render={({ field: { value } }) => (
            <Pressable
              style={styles.estimatedTimeContainer}
              onPress={() => setShowTimePicker(true)}
            >
              <MaterialCommunityIcons
                name="clock"
                size={20}
                color={COLORS.colors.primary}
                style={styles.timeIcon}
              />
              <Text style={styles.estimatedTimeText}>
                {value ? `${value}` : "Select time"}
              </Text>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={COLORS.colors.text.secondary}
                style={styles.chevronIcon}
              />
            </Pressable>
          )}
        />

        {showTimePicker && (
          <DateTimePicker
            value={
              getValues("estimatedTime")
                ? new Date(`2000-01-01T${getValues("estimatedTime")}`)
                : new Date()
            }
            mode="time"
            display="default"
            onChange={handleTimeChange}
            is24Hour={true}
          />
        )}
      </View>

      {/* Spacer */}
      <View style={styles.spacer} />

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.createTaskButton}
          onPress={handleSubmit(onSubmit)}
          activeOpacity={0.8}
        >
          <Text style={styles.createTaskButtonText}>Create Task</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AddTaskModal;

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
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";
import styles from "@/utils/addTask.style";
import { Ionicons } from "@expo/vector-icons";
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
        Alert.alert("Error", `Failed to create task: ${insertError.message}`);
        return;
      }

      Alert.alert("Success", "Task added successfully!");
      reset();
      router.push("/(tab)/tasks");
    } catch (error) {
      console.error("Error submitting task:", error);
      Alert.alert("Error", "An unexpected error occurred");
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
        <Text style={styles.newTaskTitle}>New Task</Text>
        <Pressable onPress={handleCancel}>
          <Ionicons name="close-outline" size={28} color={COLORS.textMain} />
        </Pressable>
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
                placeholder="What are you going to do?"
                placeholderTextColor={COLORS.textSecondary}
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

      {/* Tag Selection */}
      <View style={styles.formSection}>
        <Text style={styles.sectionLabel}>TAG</Text>
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

      {/* Due Date Input */}
      <View style={styles.formSection}>
        <Text style={styles.sectionLabel}>DUE DATE</Text>
        <Controller
          control={control}
          name="dueDate"
          render={({ field: { value } }) => (
            <>
              <Pressable
                style={styles.dueDateContainer}
                onPress={() => setShowDatePicker(true)}
              >
                <TextInput
                  style={styles.dueDateInput}
                  placeholder="DD/MM/YYYY"
                  placeholderTextColor={COLORS.textSecondary}
                  value={value}
                  editable={false}
                  pointerEvents="none"
                />
                <Ionicons
                  name="calendar-outline"
                  size={24}
                  color={COLORS.textMain}
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
      </View>

      {/* Estimated Time Input */}
      <View style={styles.formSection}>
        <Text style={styles.sectionLabel}>ESTIMATED TIME</Text>
        <Controller
          control={control}
          name="estimatedTime"
          render={({ field: { value } }) => (
            <Pressable
              style={styles.estimatedTimeContainer}
              onPress={() => setShowTimePicker(true)}
            >
              <TextInput
                style={styles.estimatedTimeInput}
                placeholder="HH:MM"
                placeholderTextColor={COLORS.textSecondary}
                value={value}
                editable={false}
                pointerEvents="none"
              />
              <Ionicons
                name="time-outline"
                size={24}
                color={COLORS.textSecondary}
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
          />
        )}
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.addTaskButton}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.addTaskButtonText}>Add Task</Text>
        </TouchableOpacity>
        <Pressable onPress={handleCancel}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default AddTaskModal;

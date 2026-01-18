import { COLORS } from "@/constants/color";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    flex: 1,
    paddingBottom: 30,
  },
  headerTitle: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: COLORS.border,
    borderBottomWidth: 1,
  },
  newTaskTitle: {
    color: COLORS.textMain,
    fontSize: 24,
    fontWeight: "700",
  },
  formSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.textSecondary,
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  taskNameInput: {
    fontSize: 16,
    color: COLORS.textMain,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    backgroundColor: "#FAFAFA",
  },
  // Tag Button Styles
  tagButtonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tagButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: "#F9F9F9",
  },
  tagButtonSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  tagButtonText: {
    fontSize: 13,
    fontWeight: "500",
    color: COLORS.textSecondary,
  },
  tagButtonTextSelected: {
    color: COLORS.textMain,
    fontWeight: "600",
  },
  // Priority Button Styles
  priorityButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  priorityButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: "#F9F9F9",
    alignItems: "center",
  },
  priorityButtonSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  priorityButtonText: {
    fontSize: 13,
    fontWeight: "500",
    color: COLORS.textSecondary,
  },
  priorityButtonTextSelected: {
    color: COLORS.textMain,
    fontWeight: "600",
  },
  // Due Date Styles
  dueDateContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    backgroundColor: "#FAFAFA",
  },
  dueDateInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.textMain,
    paddingRight: 8,
  },
  // Estimated Time Styles
  estimatedTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    backgroundColor: "#FAFAFA",
  },
  estimatedTimeInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.textMain,
    paddingRight: 8,
  },
  // Button Styles
  buttonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    gap: 12,
  },
  addTaskButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  addTaskButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.textMain,
  },
  cancelButtonText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: "center",
    paddingVertical: 12,
  },
  errorText: {
    fontSize: 12,
    color: COLORS.error,
    marginTop: 4,
    fontWeight: "500",
  },
});

export default styles;

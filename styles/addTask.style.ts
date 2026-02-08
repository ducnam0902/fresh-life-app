import { COLORS } from "@/constants/color";
import { Dimensions, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.colors.background,
    flex: 1,
  },

  formSection: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },

  sectionLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: COLORS.colors.text.secondary,
    marginBottom: 12,
    letterSpacing: 1,
    textTransform: "uppercase",
  },

  taskNameInput: {
    fontSize: 15,
    color: COLORS.colors.text.primary,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: COLORS.colors.border,
    borderRadius: 12,
    backgroundColor: COLORS.colors.surface,
    fontFamily: COLORS.typography.fontFamily,
  },

  placeholder: {
    color: COLORS.colors.text.secondary,
  },

  // Tag/Category Button Styles
  tagButtonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  tagButton: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.colors.border,
    backgroundColor: COLORS.colors.surface,
  },

  tagButtonSelected: {
    backgroundColor: COLORS.colors.primary,
    borderColor: COLORS.colors.primary,
  },

  tagButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.colors.text.secondary,
    fontFamily: COLORS.typography.fontFamily,
  },

  tagButtonTextSelected: {
    color: COLORS.colors.text.onPrimary,
    fontWeight: "700",
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
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.colors.border,
    backgroundColor: COLORS.colors.surface,
    alignItems: "center",
  },

  priorityButtonSelected: {
    backgroundColor: COLORS.colors.primary,
    borderColor: COLORS.colors.primary,
  },

  priorityButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.colors.text.secondary,
    fontFamily: COLORS.typography.fontFamily,
  },

  priorityButtonTextSelected: {
    color: COLORS.colors.text.onPrimary,
    fontWeight: "700",
  },

  // Due Date Styles
  dueDateContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: COLORS.colors.border,
    borderRadius: 12,
    backgroundColor: COLORS.colors.surface,
    marginBottom: 12,
  },

  dateIcon: {
    marginRight: 12,
  },

  dueDateText: {
    flex: 1,
    fontSize: 15,
    fontWeight: "500",
    color: COLORS.colors.text.primary,
    fontFamily: COLORS.typography.fontFamily,
  },

  chevronIcon: {
    marginLeft: 12,
  },

  // Estimated Time Styles
  estimatedTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: COLORS.colors.border,
    borderRadius: 12,
    backgroundColor: COLORS.colors.surface,
  },

  timeIcon: {
    marginRight: 12,
  },

  estimatedTimeText: {
    flex: 1,
    fontSize: 15,
    fontWeight: "500",
    color: COLORS.colors.text.primary,
    fontFamily: COLORS.typography.fontFamily,
  },

  // Button Styles
  buttonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    gap: 12,
    marginBottom: 8,
  },

  createTaskButton: {
    backgroundColor: COLORS.colors.primary,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },

  createTaskButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.colors.text.onPrimary,
    letterSpacing: 0.3,
    fontFamily: COLORS.typography.fontFamily,
  },

  errorText: {
    fontSize: 12,
    color: "#FF6B6B",
    marginTop: 4,
    fontWeight: "500",
    fontFamily: COLORS.typography.fontFamily,
  },
});

export default styles;

import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/color";

export default StyleSheet.create({
  budgetCard: {
    backgroundColor: COLORS.colors.surface,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.colors.border,
  },
  budgetHeader: {
    marginBottom: 16,
  },
  budgetLabel: {
    fontSize: 14,
    color: COLORS.colors.text.secondary,
    fontWeight: "400",
    marginBottom: 8,
  },
  budgetAmount: {
    fontSize: 36,
    fontWeight: "700",
    color: COLORS.colors.primary,
    letterSpacing: 0.5,
  },
  currencyText: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.colors.primary,
    marginLeft: 8,
  },
  budgetSubtext: {
    fontSize: 12,
    color: COLORS.colors.text.secondary,
    marginTop: 8,
  },
  progressBarContainer: {
    marginVertical: 20,
  },
  progressBarBackground: {
    height: 12,
    backgroundColor: COLORS.colors.surfaceLight,
    borderRadius: 6,
    overflow: "hidden",
    flexDirection: "row",
  },
  progressBarFill: {
    height: 12,
    backgroundColor: COLORS.colors.primary,
    borderRadius: 6,
  },
  expensesContainer: {
    gap: 12,
  },
  expenseItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  expenseLabel: {
    fontSize: 14,
    color: COLORS.colors.text.secondary,
    fontWeight: "400",
  },
  expenseAmount: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.colors.text.primary,
  },
});

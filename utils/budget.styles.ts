import { COLORS } from "@/constants/color";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.colors.background,
  },

  flatListContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  userContainer: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    flex: 1,
  },

  userAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.colors.surface,
  },

  greeting: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.colors.text.primary,
    fontFamily: COLORS.typography.fontFamily,
  },

  date: {
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.colors.text.secondary,
    marginTop: 2,
    fontFamily: COLORS.typography.fontFamily,
  },

  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },

  // My Budget Title
  myBudgetTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.colors.text.primary,
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 12,
    fontFamily: COLORS.typography.fontFamily,
  },

  // Budget Summary Card
  budgetSummaryCard: {
    marginHorizontal: 16,
    marginBottom: 20,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: COLORS.colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.colors.border,
  },

  budgetStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  statColumn: {
    flex: 1,
  },

  statLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: COLORS.colors.text.secondary,
    letterSpacing: 0.5,
    textTransform: "uppercase",
    marginBottom: 8,
    fontFamily: COLORS.typography.fontFamily,
  },

  remainingContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 4,
  },

  remainingAmount: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.colors.primary,
    fontFamily: COLORS.typography.fontFamily,
  },

  budgetContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 4,
  },

  budgetAmount: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.colors.text.primary,
    fontFamily: COLORS.typography.fontFamily,
  },

  statCurrency: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.colors.text.secondary,
    fontFamily: COLORS.typography.fontFamily,
  },

  verticalDivider: {
    width: 1,
    height: 40,
    backgroundColor: COLORS.colors.border,
    marginHorizontal: 16,
  },

  // Usage Section
  usageSection: {
    gap: 8,
  },

  usageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  usageLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: COLORS.colors.text.secondary,
    letterSpacing: 0.5,
    textTransform: "uppercase",
    fontFamily: COLORS.typography.fontFamily,
  },

  usagePercentage: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.colors.text.primary,
    fontFamily: COLORS.typography.fontFamily,
  },

  progressBarContainer: {
    height: 8,
    backgroundColor: COLORS.colors.border,
    borderRadius: 4,
    overflow: "hidden",
  },

  progressBar: {
    height: "100%",
    backgroundColor: COLORS.colors.primary,
    borderRadius: 4,
  },

  // No Budget Container
  noBudgetContainer: {
    marginHorizontal: 16,
    marginBottom: 20,
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: COLORS.colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.colors.border,
    alignItems: "center",
    gap: 12,
  },

  noBudgetText: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.colors.text.secondary,
    fontFamily: COLORS.typography.fontFamily,
  },

  createBudgetButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: COLORS.colors.primary,
    borderRadius: 12,
  },

  createBudgetButtonText: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.colors.text.onPrimary,
    fontFamily: COLORS.typography.fontFamily,
  },

  // Recent Activity Section
  recentActivityHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 12,
  },

  recentActivityTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.colors.text.secondary,
    letterSpacing: 0.5,
    textTransform: "uppercase",
    fontFamily: COLORS.typography.fontFamily,
  },

  viewAllLink: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.colors.primary,
    fontFamily: COLORS.typography.fontFamily,
  },

  // Expense Item
  expenseItem: {
    marginHorizontal: 16,
    marginBottom: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: COLORS.colors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.colors.border,
  },

  expenseContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },

  expenseTextContainer: {
    flex: 1,
  },

  expenseName: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.colors.text.primary,
    marginBottom: 4,
    fontFamily: COLORS.typography.fontFamily,
  },

  expenseReason: {
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.colors.text.secondary,
    fontFamily: COLORS.typography.fontFamily,
  },

  expenseTagBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },

  expenseTagText: {
    fontSize: 10,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.4,
    fontFamily: COLORS.typography.fontFamily,
  },

  expenseAmountContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 8,
    marginTop: 10,
  },

  expenseAmount: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.colors.primary,
    fontFamily: COLORS.typography.fontFamily,
  },
  
  // Empty State
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 200,
  },

  emptyText: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.colors.text.secondary,
    fontFamily: COLORS.typography.fontFamily,
  },
});

export default styles;
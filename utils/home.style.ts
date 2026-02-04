import { COLORS } from "@/constants/color";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.colors.background,
  },

  scrollView: {
    flex: 1,
  },

  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.colors.border,
  },

  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.colors.text.primary,
    fontFamily: COLORS.typography.fontFamily,
  },

  notificationIcon: {
    padding: 8,
  },

  // Welcome Section
  welcomeSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 20,
  },

  welcomeText: {
    flex: 1,
  },

  greeting: {
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.colors.text.secondary,
    fontFamily: COLORS.typography.fontFamily,
  },

  userName: {
    fontSize: 26,
    fontWeight: "700",
    color: COLORS.colors.primary,
    fontFamily: COLORS.typography.fontFamily,
  },

  avatarContainer: {
    position: "relative",
    width: 60,
    height: 60,
  },

  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: COLORS.colors.primary,
  },

  avatarBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.colors.background,
    borderRadius: 12,
    padding: 2,
  },

  // Section Container
  sectionContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },

  // Task Progress Card
  taskProgressCard: {
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.colors.border,
    overflow: "hidden",
  },

  taskProgressContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
  },

  circleProgressContainer: {
    alignItems: "center",
    justifyContent: "center",
  },

  circleProgress: {
    borderRadius: 70,
    justifyContent: "center",
    alignItems: "center",
  },

  circleProgressText: {
    alignItems: "center",
    position: "relative",
  },

  progressChart: {},

  progressTextContent: {
    position: "absolute",
    top: "50%",
    left: "50%",
    zIndex: 5,
    alignItems: "center",
    transform: [{ translateX: "-50%" }, { translateY: "-50%" }],
  },

  progressPercentage: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.colors.primary,
    fontFamily: COLORS.typography.fontFamily,
    alignContent: "center",
  },

  progressLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: COLORS.colors.text.secondary,
    marginTop: 4,
    fontFamily: COLORS.typography.fontFamily,
  },

  taskStatsContainer: {
    flex: 1,
    gap: 12,
  },

  taskStatItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  statDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },

  statLabel: {
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.colors.text.secondary,
    fontFamily: COLORS.typography.fontFamily,
  },

  statValue: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.colors.text.primary,
    fontFamily: COLORS.typography.fontFamily,
  },

  groupButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  budgetCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: COLORS.colors.border,
  },
  budgetLabel: {
    fontSize: 14,
    color: COLORS.colors.text.secondary,
    fontWeight: "500",
    marginBottom: 8,
    textAlign: "center",
  },
  amountContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 8,
    justifyContent: "center",
  },
  amountValue: {
    fontSize: 32,
    fontWeight: "700",
    color: COLORS.colors.primary,
    marginRight: 8,
  },
  currencyLabel: {
    fontSize: 16,
    color: COLORS.colors.primary,
    fontWeight: "600",
  },
  remainingText: {
    fontSize: 16,
    color: COLORS.colors.text.secondary,
    marginBottom: 16,
    textAlign: "center",
  },
  remainingAmount: {
    color: COLORS.colors.text.primary,
    fontWeight: "600",
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
  budgetItemsContainer: {
    marginTop: 12,
    gap: 12,
  },
  budgetItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  budgetItemLabel: {
    fontSize: 15,
    color: COLORS.colors.text.secondary,
    fontWeight: "400",
  },
  budgetItemAmount: {
    fontSize: 15,
    color: COLORS.colors.text.primary,
    fontWeight: "600",
  },
});

export default styles;

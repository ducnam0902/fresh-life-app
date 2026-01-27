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

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.colors.text.primary,
    marginBottom: 12,
    fontFamily: COLORS.typography.fontFamily,
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

  circleProgressInner: {
    borderRadius: 60,
    borderWidth: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  circleProgressText: {
    alignItems: "center",
  },

  progressPercentage: {
    fontSize: 28,
    fontWeight: "700",
    color: COLORS.colors.primary,
    fontFamily: COLORS.typography.fontFamily,
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

  // Budget Card
  budgetCard: {
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.colors.border,
    overflow: "hidden",
  },

  budgetContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
    marginBottom: 16,
  },

  gaugeContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 120,
  },

  gaugeChart: {
    width: 100,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },

  gaugeArc: {
    width: 80,
    height: 40,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderWidth: 6,
    borderBottomWidth: 0,
    borderLeftColor: COLORS.colors.border,
    borderRightColor: COLORS.colors.border,
  },

  gaugeLabel: {
    marginTop: 8,
  },

  gaugeText: {
    fontSize: 11,
    fontWeight: "600",
    color: COLORS.colors.primary,
    fontFamily: COLORS.typography.fontFamily,
  },

  budgetInfo: {
    flex: 1,
  },

  budgetTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.colors.text.secondary,
    marginBottom: 8,
    fontFamily: COLORS.typography.fontFamily,
  },

  budgetAmount: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.colors.text.primary,
    fontFamily: COLORS.typography.fontFamily,
  },

  budgetSubtext: {
    fontSize: 13,
    fontWeight: "400",
    color: COLORS.colors.text.secondary,
    marginTop: 4,
    fontFamily: COLORS.typography.fontFamily,
  },

  budgetExpense: {
    color: COLORS.colors.text.primary,
    fontWeight: "500",
  },

  budgetDivider: {
    height: 1,
    backgroundColor: COLORS.colors.border,
    marginVertical: 16,
  },

  trendSection: {
    gap: 12,
  },

  trendHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  trendLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.colors.text.secondary,
    fontFamily: COLORS.typography.fontFamily,
  },

  trendValue: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  trendPercent: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.colors.primary,
    fontFamily: COLORS.typography.fontFamily,
  },

  lineChart: {
    marginVertical: 8,
    borderRadius: 8,
  },
});

export default styles;

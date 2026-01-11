import { COLORS } from "@/constants/color";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  notiContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  notiIcon: {
    borderRadius: 9999,
    backgroundColor: COLORS.surface,
    height: 36,
    width: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeContainer: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 9999,
    display: "flex",
    
  },
  title: {
    color: COLORS.accent,
    fontSize: 14,
    fontWeight: 400,
    marginBottom: 4,
  },
  subTitle: {
    color: COLORS.textMain,
    fontSize: 16,
    fontWeight: 600,
  },
  today: {
    fontSize: 24,
    fontWeight: 600,
    marginTop: 16,
    letterSpacing: 0.1,
  },
  overviewContainer: {
    padding: 24,
    backgroundColor: COLORS.surface,
    marginTop: 16,
    borderRadius: 16,
    borderColor: COLORS.border,
    borderWidth: 0.5,
    elevation: 5,
    shadowColor: COLORS.border,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
  todayRemaining: {
    marginBottom: 12,
  },
  remainingTitle: {
    fontSize: 16,
    color: COLORS.accent,
    marginBottom: 2,
    fontWeight: 400,
  },
  remeiningValue: {
    fontSize: 35,
    fontWeight: 900,
    color: COLORS.textMain,
  },
  budgetToday: {
    flexDirection: "row",
    gap: 4,
    justifyContent: "space-between",
  },

  budgetLimitTitle: {
    fontSize: 14,
    color: COLORS.accent,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  budgetLimitValue: {
    fontSize: 18,
    color: COLORS.success,
    fontWeight: 800,
  },
  verticalLine: {
    borderColor: COLORS.border,
    borderLeftWidth: 0.4,
  },

  spentTodayTitle: {
    fontSize: 14,
    color: COLORS.accent,
    textTransform: "uppercase",
    marginBottom: 8,
    textAlign: "right",
  },
  spentTodayValue: {
    fontSize: 18,
    color: COLORS.error,
    fontWeight: 800,
    textAlign: "right",
  },
  horizontalLine: {
    marginTop: 16,
    borderColor: COLORS.border,
    borderBottomWidth: 0.2,
  },
  dailyUsageContainer: {
    marginTop: 20,
  },
  dailyUsageSection: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dailyUsageTitle: {
    fontSize: 16,
    color: COLORS.accent,
    fontWeight: 500,
  },
  dailyUsageValue: {
    fontSize: 16,
    color: COLORS.textMain,
    fontWeight: 500,
  },
  slideContainer: {
    marginTop: 12,
  },
  slideStatus: {
    borderWidth: 6,
    borderRadius: 40,
    borderColor: COLORS.border,
    opacity: 0.3,
    position: "relative",
  },
  activeSlide: {
    padding: 6,
    borderRadius: 40,
    position: "absolute",
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    paddingVertical: 12,
    borderRadius: 16,

    backgroundColor: COLORS.primary,
    textAlign: "center",
    width: "48%",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    justifyContent: "center",
  },
  buttonTitle: {
    color: COLORS.textMain,
    fontSize: 16,
    fontWeight: 700,
  },
  transactionButton: {
    backgroundColor: COLORS.surface,
    borderWidth: 0.6,
    borderColor: COLORS.border
  },
});

export default styles;

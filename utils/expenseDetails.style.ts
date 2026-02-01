import { COLORS } from "@/constants/color";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 600,
    color: COLORS.colors.text.primary,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  amountCard: {
    backgroundColor: COLORS.colors.surface,
    borderRadius: 40,
    padding: 24,
    marginBottom: 24,
    alignItems: "center",

  },
  tagBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    marginBottom: 16,
  },
  tagText: {
    fontSize: 12,
    fontWeight: 600,
    color: COLORS.colors.text.onPrimary,
  },
  amountText: {
    fontSize: 36,
    fontWeight: 700,
    color: COLORS.colors.primary,
  },
  currencyText: {
    fontSize: 14,
    color: COLORS.colors.text.secondary,
  },
  detailsSection: {
    marginBottom: 24,
  },
  expenseTitle: {
    fontSize: 22,
    fontWeight: 700,
    color: COLORS.colors.text.primary,
    marginBottom: 8,
  },
  expenseReason: {
    fontSize: 14,
    color: COLORS.colors.text.secondary,
  },
  dateSection: {
    paddingLeft: 8,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 16,
    paddingBottom: 24,
  },
  dateInfo: {
    flex: 1,
  },
  dateLabel: {
    fontSize: 12,
    color: COLORS.colors.text.secondary,
    marginBottom: 4,
  },
  dateValue: {
    fontSize: 14,
    fontWeight: 500,
    color: COLORS.colors.text.primary,
  },
  errorText: {
    fontSize: 14,
    color: COLORS.colors.error,
    textAlign: "center",
  },
});

export default styles;
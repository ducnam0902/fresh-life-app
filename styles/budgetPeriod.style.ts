import { COLORS } from "@/constants/color";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.colors.background,
  },

  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },

  // Header
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.colors.border,
  },

  backButton: {
    padding: 4,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.colors.text.primary,
    letterSpacing: 0.5,
    fontFamily: COLORS.typography.fontFamily,
  },

  // Form Section
  formSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },

  sectionLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: COLORS.colors.text.secondary,
    marginBottom: 12,
    letterSpacing: 1,
    textTransform: "uppercase",
    fontFamily: COLORS.typography.fontFamily,
  },

  // Input Styles
  input: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.colors.text.primary,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: COLORS.colors.border,
    borderRadius: 18,
    backgroundColor: COLORS.colors.surface,
    fontFamily: COLORS.typography.fontFamily,
  },

  // Date Container
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: COLORS.colors.border,
    borderRadius: 18,
    backgroundColor: COLORS.colors.surface,
    marginBottom: 12,
  },

  dateIcon: {
    marginRight: 12,
  },

  dateLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: "500",
    color: COLORS.colors.text.primary,
    fontFamily: COLORS.typography.fontFamily,
  },

  dateValue: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.colors.text.secondary,
    fontFamily: COLORS.typography.fontFamily,
  },

  // Amount Container
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.colors.border,
    borderRadius: 18,
    backgroundColor: COLORS.colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },

  amountInput: {
    flex: 1,
    fontSize: 28,
    fontWeight: "700",
    color: COLORS.colors.text.primary,
    fontFamily: COLORS.typography.fontFamily,
  },

  amountCurrency: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.colors.primary,
    marginLeft: 12,
    fontFamily: COLORS.typography.fontFamily,
  },

  // Info Banner
  infoBanner: {
    marginHorizontal: 16,
    marginVertical: 16,
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: `${COLORS.colors.primary}15`,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: `${COLORS.colors.primary}30`,
    alignItems: "center",
    gap: 12,
  },

  infoIcon: {
    marginTop: 2,
    flexShrink: 0,
  },

  infoBannerText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.colors.text.secondary,
    lineHeight: 20,
    fontFamily: COLORS.typography.fontFamily,
  },

  infoBannerHighlight: {
    color: COLORS.colors.primary,
    fontWeight: "700",
  },

  // Spacer
  spacer: {
    minHeight: 40,
  },

  // Button Container
  buttonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  saveBudgetButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: COLORS.colors.primary,
    paddingVertical: 16,
    borderRadius: 20,
    shadowColor: COLORS.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },

  saveBudgetButtonDisabled: {
    opacity: 0.7,
  },

  saveBudgetButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.colors.text.onPrimary,
    letterSpacing: 0.3,
    fontFamily: COLORS.typography.fontFamily,
  },

  checkIcon: {
    marginLeft: 4,
  },

  // Error Text
  errorText: {
    fontSize: 12,
    color: COLORS.colors.error,
    marginTop: 4,
    fontWeight: "500",
    fontFamily: COLORS.typography.fontFamily,
  },
});

export default styles;
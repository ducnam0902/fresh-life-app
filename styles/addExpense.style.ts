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

  // Form Section
  formSection: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },

  fieldLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.colors.text.primary,
    marginBottom: 10,
    fontFamily: COLORS.typography.fontFamily,
  },

  categoryLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: COLORS.colors.text.secondary,
    marginBottom: 12,
    letterSpacing: 1,
    textTransform: "uppercase",
    fontFamily: COLORS.typography.fontFamily,
  },

  // Text Input
  textInput: {
    fontSize: 15,
    fontWeight: "500",
    color: COLORS.colors.text.primary,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: COLORS.colors.border,
    borderRadius: 16,
    backgroundColor: COLORS.colors.surface,
    fontFamily: COLORS.typography.fontFamily,
  },

  // Amount Input Container
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.colors.border,
    borderRadius: 16,
    backgroundColor: COLORS.colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },

  amountInput: {
    flex: 1,
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.colors.text.primary,
    fontFamily: COLORS.typography.fontFamily,
  },

  currencyLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.colors.primary,
    marginLeft: 12,
    fontFamily: COLORS.typography.fontFamily,
  },

  // Category Buttons
  categoryButtonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.colors.border,
    backgroundColor: COLORS.colors.surface,
  },

  categoryButtonSelected: {
    backgroundColor: COLORS.colors.primary,
    borderColor: COLORS.colors.primary,
  },

  categoryButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.colors.text.secondary,
    fontFamily: COLORS.typography.fontFamily,
  },

  categoryButtonTextSelected: {
    color: COLORS.colors.text.onPrimary,
    fontWeight: "700",
  },

  // Button Container
  buttonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
  },

  addExpenseButton: {
    backgroundColor: COLORS.colors.primary,
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },

  addExpenseButtonDisabled: {
    opacity: 0.7,
  },

  addExpenseButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.colors.text.onPrimary,
    letterSpacing: 0.3,
    fontFamily: COLORS.typography.fontFamily,
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
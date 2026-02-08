import { COLORS } from "@/constants/color";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.colors.background,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },

  completedButton: {
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

  completedButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.colors.text.onPrimary,
    letterSpacing: 0.3,
    fontFamily: COLORS.typography.fontFamily,
  },
});

export default styles;

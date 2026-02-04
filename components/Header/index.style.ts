import { COLORS } from "@/constants/color";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 8,
  },

  welcomeContainer: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    flex: 1,
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },

  title: {
    fontSize: 18,
    color: COLORS.colors.text.primary,
    fontWeight: "600",
    letterSpacing: 0.5,
  },

  dateText: {
    fontSize: 14,
    color: COLORS.colors.text.secondary,
    fontWeight: "400",
    marginTop: 2,
  },

  addIcon: {
    borderRadius: 24,
    backgroundColor: COLORS.colors.primary,
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
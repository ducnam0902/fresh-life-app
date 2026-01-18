import { COLORS } from "@/constants/color";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
    paddingHorizontal: 16,
    position: "relative",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addIcon: {
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
    fontSize: 20,
    color: COLORS.textMain,
    fontWeight: 600,
    letterSpacing: 0.5,
  },
  overviewContainer: {
    marginVertical: 16,
    borderWidth: 0.4,
    borderRadius: 20,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    padding: 24,
  },
  overviewTitle: {
    color: COLORS.textSecondary,
    textTransform: "uppercase",
    fontSize: 20,
    fontWeight: 500,
    marginBottom: 6,
    letterSpacing: 0.6,
  },
  progress: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  percentTask: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "baseline",
  },
  percent: {
    fontSize: 35,
    color: COLORS.textMain,
    fontWeight: 500,
  },
  percentText: {
    color: COLORS.textSecondary,
    fontSize: 20,
    fontWeight: 300,
  },
  doneTask: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  doneTitle: {
    color: COLORS.textMain,
    fontWeight: 600,
    paddingHorizontal: 4,
  },
  titleContainer: {
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleText: {
    color: COLORS.textMain,
    fontSize: 24,
    fontWeight: 600,
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginVertical: 8,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  checkboxContainer: {
    marginRight: 12,
  },

  checkboxUnchecked: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.textSecondary,
    backgroundColor: COLORS.surface,
  },

  checkboxChecked: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },

  taskContent: {
    flex: 1,
  },

  taskTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: COLORS.textMain,
    marginBottom: 4,
  },

  taskTitleCompleted: {
    textDecorationLine: "line-through",
    color: COLORS.textSecondary,
  },

  taskTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
  },

  taskTime: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.accent,
    marginLeft: 4,
  },

  tagBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },

  tagText: {
    fontSize: 12,
    fontWeight: "700",
  },
});

export default styles;

import { COLORS } from "@/constants/color";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  flatListContainer: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 20,
  },

  container: {
    flex: 1,
    backgroundColor: COLORS.colors.background,
  },

  // Overview Container
  overviewContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: COLORS.colors.border,
    backgroundColor: COLORS.colors.surface,
    padding: 16,
  },

  overviewStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  statColumn: {
    alignItems: "center",
    flex: 1,
  },

  statLabel: {
    color: COLORS.colors.text.secondary,
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  statRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 6,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.colors.text.primary,
  },

  statUnit: {
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.colors.primary,
    marginTop: 2,
  },

  divider: {
    width: 1,
    height: 40,
    backgroundColor: COLORS.colors.border,
    marginHorizontal: 8,
  },

  chartContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  chartPercentText: {
    position: "absolute",
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.colors.text.primary,
  },

  // Tasks Title
  tasksTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.colors.text.primary,
    marginBottom: 12,
    marginTop: 4,
  },

  linkContainer: {
    marginBottom: 12,
  },
  // Task Item
  taskItem: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 20,

    backgroundColor: COLORS.colors.surface,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: COLORS.colors.border,
  },

  checkboxContainer: {
    marginRight: 12,
  },

  checkboxUnchecked: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.colors.primary,
    backgroundColor: "transparent",
  },

  checkboxChecked: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },

  taskContent: {
    flex: 1,
    marginLeft: 10,
  },

  taskTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.colors.text.primary,
    marginBottom: 6,
  },

  taskTitleCompleted: {
    textDecorationLine: "line-through",
    color: COLORS.colors.text.secondary,
  },

  taskMetaContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  taskTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  taskTime: {
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.colors.text.secondary,
  },

  priorityText: {
    fontSize: 12,
    fontWeight: "600",
  },

  tagBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginHorizontal: 8,
  },

  tagText: {
    fontSize: 10,
    fontWeight: "700",
    textTransform: "uppercase",
  },

  chevron: {
    marginLeft: 8,
  },
});

export default styles;

import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/color";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: COLORS.layout.spacing.padding,
  },
  summaryCard: {
    backgroundColor: COLORS.colors.surface,
    padding: 24,
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderLeftWidth: 4,
    borderLeftColor: COLORS.colors.primary, // Simulating that green glow/edge
  },
  summaryLabel: {
    color: COLORS.colors.text.secondary,
    fontSize: 10,
    letterSpacing: 1,
    fontWeight: "700",
  },
  activeCountRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 8,
    marginTop: 4,
  },
  activeNumber: {
    color: COLORS.colors.primary,
    fontSize: 32,
    fontWeight: "800",
  },
  activeText: {
    color: COLORS.colors.primary,
    fontSize: 16,
  },
  summaryIconContainer: {
    backgroundColor: "rgba(0, 230, 118, 0.1)",
    padding: 12,
    borderRadius: 16,
  },

  card: {
    backgroundColor: COLORS.colors.surface,
    borderRadius: 50,
    padding: 20,
    gap: 10,
    marginBottom: 16,
  },
  
  cardHeader: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  cardTitle: {
    color: COLORS.colors.text.primary,
    fontSize: 16,
    fontWeight: "700",
    flex: 1,
    marginRight: 10,
  },
  tagContainer: {
    backgroundColor: "rgba(255,255,255,0.05)",
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  tagText: {
    color: COLORS.colors.info,
    fontSize: 10,
    fontWeight: "700",
  },
  groupItem: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  priorityText: {
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  infoText: {
    color: COLORS.colors.text.secondary,
    fontSize: 13,
  },
});

export default styles;

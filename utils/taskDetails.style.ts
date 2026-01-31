import { COLORS } from "@/constants/color";
import {  StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.colors.background,
  },

  contentContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  errorText: {
    fontSize: 16,
    color: COLORS.colors.text.secondary,
    fontWeight: "500",
  },

  // Header
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
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

  // Status Card
  statusCard: {
    marginHorizontal: 16,
    marginBottom: 20,
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: COLORS.colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.colors.border,
  },

  statusLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: COLORS.colors.text.secondary,
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 12,
    fontFamily: COLORS.typography.fontFamily,
  },

  statusContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  statusLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },

  statusText: {
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.3,
    fontFamily: COLORS.typography.fontFamily,
  },

  tagBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },

  tagBadgeText: {
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    fontFamily: COLORS.typography.fontFamily,
  },

  // Task Title Section
  titleSection: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },

  taskTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: COLORS.colors.text.primary,
    lineHeight: 36,
    letterSpacing: 0.3,
    fontFamily: COLORS.typography.fontFamily,
  },

  // Info Section
  infoSection: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },

  infoBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  infoText: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.colors.text.secondary,
    fontFamily: COLORS.typography.fontFamily,
  },

  // Button Container
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

  // Completed Banner
  completedBanner: {
    marginHorizontal: 16,
    marginBottom: 24,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: `${COLORS.colors.primary}20`,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: `${COLORS.colors.primary}40`,
    gap: 8,
  },

  completedBannerText: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.colors.primary,
    letterSpacing: 0.3,
    fontFamily: COLORS.typography.fontFamily,
  },
});

export default styles;

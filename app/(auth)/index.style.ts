import { COLORS } from "@/constants/color";
import { Dimensions, StyleSheet } from "react-native";

const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.colors.background,
  },

  backgroundGradient: {
    flex: 1,
    width: "100%",
  },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 40,
    justifyContent: "space-between",
    alignItems: "center",
  },

  // Logo Section
  logoContainer: {
    alignItems: "center",
    marginBottom: 32,
    marginTop: 40,
  },

  logoBadge: {
    width: 100,
    height: 100,
    borderRadius: 9999,
    backgroundColor: COLORS.colors.surface,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    // borderColor: COLORS.colors.border,
    shadowColor: COLORS.colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },

  // Title Section
  titleContainer: {
    alignItems: "center",
    marginBottom: 48,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: COLORS.colors.text.primary,
    marginBottom: 12,
    letterSpacing: 0.5,
    fontFamily: COLORS.typography.fontFamily,
  },

  subtitle: {
    fontSize: 15,
    fontWeight: "400",
    color: COLORS.colors.text.secondary,
    textAlign: "center",
    lineHeight: 24,
    fontFamily: COLORS.typography.fontFamily,
  },

  // Google Sign In Button
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.colors.text.primary,
    borderRadius: 24,
    paddingVertical: 14,
    paddingHorizontal: 24,
    marginBottom: 24,
    width: "100%",
    minHeight: 54,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },

  googleButtonPressed: {
    opacity: 0.8,
  },

  googleIcon: {
    marginRight: 12,
    fontWeight: "600",
  },

  googleButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.colors.text.onPrimary,
    letterSpacing: 0.3,
    fontFamily: COLORS.typography.fontFamily,
  },

  // Sign Up Section
  signUpContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    gap: 4,
  },

  signUpText: {
    fontSize: 15,
    fontWeight: "400",
    color: COLORS.colors.text.secondary,
    fontFamily: COLORS.typography.fontFamily,
  },

  signUpLink: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.colors.primary,
    letterSpacing: 0.3,
    fontFamily: COLORS.typography.fontFamily,
  },

  // Spacer
  spacer: {
    flex: 1,
  },

  // Terms and Privacy
  termsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 16,
  },

  termsText: {
    fontSize: 13,
    fontWeight: "400",
    color: COLORS.colors.text.secondary,
    textAlign: "center",
    fontFamily: COLORS.typography.fontFamily,
    lineHeight: 20,
  },

  termsLink: {
    fontSize: 13,
    fontWeight: "500",
    color: COLORS.colors.primary,
    textDecorationLine: "underline",
    fontFamily: COLORS.typography.fontFamily,
  },
});

export default styles;

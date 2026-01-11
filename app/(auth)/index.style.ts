import { COLORS } from "@/constants/color";
import { Dimensions, StyleSheet } from "react-native";

const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: COLORS.backgroundLight,
    paddingHorizontal: 20,
    paddingTop: windowHeight * 0.2,
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 700,
    marginBottom: 12,
  },
  subTitle: {
    fontSize: 18,
    marginBottom: 16,
    color: COLORS.textSecondary,
    fontWeight: 500,
    paddingHorizontal: 5,
    textAlign: "center",
  },
  signInButton: {
    marginTop: 16,
    paddingVertical: 16,
    paddingHorizontal: "auto",
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  signInIcon: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    padding: 4,
    marginRight: 12,
  },
  signInText: {
    fontWeight: 600,
    fontSize: 18,
    color: COLORS.textMain,
    textAlign: "center",
    marginLeft: 8,
  },
  googleIcon: {
    width: 24,
    height: 24,
  },
});

export default styles;

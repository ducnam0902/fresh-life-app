import { COLORS } from "@/constants/color";
import React from "react";
import { ActivityIndicator, Dimensions, StyleSheet, View } from "react-native";

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
    zIndex: 100,
    height: height,
    width: width,
    position: "absolute",
    top: 0,
    left: 0,
    opacity: 0.7,
  },
});

const LoadingScreen = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default LoadingScreen;

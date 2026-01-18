import { View, Text, StyleSheet, DimensionValue } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "@/constants/color";

const styles = StyleSheet.create({
  slideContainer: {
    marginTop: 12,
  },
  slideStatus: {
    borderWidth: 6,
    borderRadius: 40,
    borderColor: COLORS.border,
    opacity: 0.3,
    position: "relative",
  },
  activeSlide: {
    padding: 6,
    borderRadius: 40,
    position: "absolute",
  },
});

type ProgressBarProps =  {
    activePercents: DimensionValue,
}

const ProgressBar = ({
activePercents
}: ProgressBarProps) => {
  return (
    <View style={styles.slideContainer}>
      <View style={styles.slideStatus}></View>
      <LinearGradient
        // Button Linear Gradient
        colors={[COLORS.primary, COLORS.third]}
        style={{
          ...styles.activeSlide,
          width: activePercents,
        }}
        start={{ x: 0, y: 0 }} // Start at the top left
        end={{ x: 1, y: 0 }} // End at the top right
      ></LinearGradient>
    </View>
  );
};

export default ProgressBar;

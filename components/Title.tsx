import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { COLORS } from "@/constants/color";

const styles = StyleSheet.create({
  screenTitle: {
    color: COLORS.colors.text.primary,
    fontSize: COLORS.typography.fontSize.h2,
    fontWeight: "700",
    marginVertical: 10,
    paddingLeft: 12,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.colors.primary,
    marginBottom: 16,
    marginTop: 16,
  },
});

interface ITitle {
  title: string;
}

const Title = ({ title }: ITitle) => {
  return <Text style={styles.screenTitle}>{title}</Text>;
};

export default Title;

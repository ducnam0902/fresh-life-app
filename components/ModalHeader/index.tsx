import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/color";

const styles = StyleSheet.create({
  // Header
  headerContainer: {
    paddingHorizontal: 8,
    paddingBottom: 12,
    paddingTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.colors.border,
    marginBottom: 16,
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
});

interface IModalHeader {
    onCancel: () => void;
    title: string
}

const ModalHeader = ({onCancel, title}: IModalHeader) => {
  return (
    <View style={styles.headerContainer}>
      <Pressable onPress={onCancel} style={styles.backButton}>
        <Ionicons
          name="chevron-back"
          size={28}
          color={COLORS.colors.text.primary}
        />
      </Pressable>
      <Text style={styles.headerTitle}>{title}</Text>
      <View style={{ width: 28 }} />
    </View>
  );
};

export default ModalHeader;

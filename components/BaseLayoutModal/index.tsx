import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
interface IBaseLayoutModal {
  children: React.ReactNode;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
});

const BaseLayoutModal = ({ children }: IBaseLayoutModal) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        ...styles.container,
        height: Dimensions.get("window").height - insets.top - insets.bottom,
      }}
    >
      {children}
    </View>
  );
};

export default BaseLayoutModal;

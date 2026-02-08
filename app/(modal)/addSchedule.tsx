import { View, Text } from "react-native";
import React from "react";
import styles from "@/styles/addSchedule.style";
import { useRouter } from "expo-router";
import ModalHeader from "@/components/ModalHeader";

const AddSchedule = () => {
  const router = useRouter();

  const handleCancel = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <ModalHeader onCancel={handleCancel} title="Add Schedule" />
    </View>
  );
};

export default AddSchedule;

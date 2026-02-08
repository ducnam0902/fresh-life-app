import { View, Text, Pressable } from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import styles from "@/styles/scheduleDetails.style";
import ModalHeader from "@/components/ModalHeader";
import BaseLayoutModal from "@/components/BaseLayoutModal";

const ScheduleDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();


  return (
    <View style={styles.container}>
      <BaseLayoutModal>
        <View>
          <ModalHeader
            title="Schedule Details"
            onCancel={() => router.back()}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.completedButton}
            // onPress={handleToggleComplete}
          >
            <Text style={styles.completedButtonText}>Edit Schedule</Text>
          </Pressable>
        </View>
      </BaseLayoutModal>
    </View>
  );
};

export default ScheduleDetails;

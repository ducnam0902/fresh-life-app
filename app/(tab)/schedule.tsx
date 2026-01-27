import { COLORS } from "@/constants/color";
import { useAuthStore } from "@/store/authStore";
import { useLoadingStore } from "@/store/loadingStore";
import { supabase } from "@/utils/supabase";

import { useRouter } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";
const ProfileScreen = () => {
  const router = useRouter();
  const { setLoading } = useLoadingStore();
  const { setUser } = useAuthStore();
  const logout = async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut();
    } catch (error) {
      console.log(error);
    } finally {
      setUser(null);
      router.push("/(auth)");
      setLoading(false);
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <Text>ProfileScreen</Text>
      <Pressable
        onPress={logout}
        style={{
          backgroundColor: COLORS.colors.background,
          margin: 6,
          borderRadius: 6,
          padding: 4,
          width: 80,
        }}
      >
        <Text>Sign out</Text>
      </Pressable>
    </View>
  );
};

export default ProfileScreen;

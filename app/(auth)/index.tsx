import { useLoadingStore } from "@/store/loadingStore";

import { COLORS } from "@/constants/color";
import { useAuthStore } from "@/store/authStore";
import authServices from "@/utils/authServices";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  GoogleSignin,
  isSuccessResponse
} from "@react-native-google-signin/google-signin";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import styles from "./index.style";

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
  iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
  scopes: ["https://www.googleapis.com/auth/drive.readonly"],
});

const SignInScreen = () => {
  const { setLoading } = useLoadingStore();
  const { setUser } = useAuthStore();
  const router = useRouter();

  const signIn = async () => {
    setLoading(true);
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      if (isSuccessResponse(userInfo) && userInfo.data.idToken) {
        await authServices.signInWithId(userInfo.data.idToken);
        const email = userInfo.data.user.email;
        const isSignUpUser = await authServices.checkSignUpUser(email);

        const userSession = isSignUpUser
          ? await authServices.insertUser(userInfo)
          : await authServices.getUserByEmail(email);

        setUser(userSession[0] ?? null);
        router.push("/(tab)/home");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[COLORS.colors.surface, COLORS.colors.surfaceLight]}
        start={{ x: 1, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.backgroundGradient}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.logoContainer}>
            <View style={styles.logoBadge}>
              <Image
                source={require("@/assets/fresh-logo.png")}
                style={styles.logoBadge}
              />
            </View>
          </View>

          <View style={styles.titleContainer}>
            <Text style={styles.title}>Fresh Life</Text>
            <Text style={styles.subtitle}>
              Step into a healthier rhythm with{"\n"}every choice.
            </Text>
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.googleButton,
              pressed && styles.googleButtonPressed,
            ]}
            onPress={signIn}
            disabled={false}
          >
            <MaterialCommunityIcons
              name="google"
              size={20}
              color={COLORS.colors.error}
              style={styles.googleIcon}
            />
            <Text style={styles.googleButtonText}>Continue with Google</Text>
          </Pressable>
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

export default SignInScreen;

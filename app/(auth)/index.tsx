import { useLoadingStore } from "@/store/loadingStore";

import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { Image } from "expo-image";
import React from "react";
import {
  Pressable,
  ScrollView,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import styles from "./index.style";
import { supabase } from "@/utils/supabase";
import { Link, useRouter } from "expo-router";
import { useAuthStore } from "@/store/authStore";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "@/constants/color";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
      if (isSuccessResponse(userInfo)) {
        if (userInfo.data.idToken) {
          const { data, error } = await supabase.auth.signInWithIdToken({
            provider: "google",
            token: userInfo.data.idToken,
          });

          if (data?.user) {
            const isUserExists = await supabase
              .from("Users")
              .select("*")
              .eq("email", data.user?.email);

            if (isUserExists.data?.length === 0) {
              const response = await supabase.from("Users").insert({
                name: data.session?.user.user_metadata?.name,
                email: data.session?.user.email,
                avatar: data.session?.user.user_metadata?.avatar_url,
              });
            }

            const userRes = await supabase
              .from("Users")
              .select("*")
              .eq("email", data.user?.email);
            setUser(userRes.data ? userRes.data[0] : {});
            router.push("/(tab)/home");
          }
        }
      } else {
        // sign in was cancelled by user
      }
    } catch (error) {
      console.log(error);
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            // operation (eg. sign in) already in progress
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // Android only, play services not available or outdated
            break;
          default:
          // some other error happened
        }
      } else {
        // an error that's not related to google sign in occurred
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[COLORS.colors.background, COLORS.colors.surfaceLight]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.backgroundGradient}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Logo Section */}
          <View style={styles.logoContainer}>
            <View style={styles.logoBadge}>
              {/* <MaterialCommunityIcons
                name="leaf"
                size={48}
                color={COLORS.colors.primary}
              /> */}
                <Image source={require("@/assets/fresh-logo.png")} style={styles.logoBadge} />
            </View>
          </View>

          {/* Title Section */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Fresh Life</Text>
            <Text style={styles.subtitle}>
              Step into a healthier rhythm with{"\n"}every choice.
            </Text>
          </View>

          {/* Google Sign In Button */}
          <Pressable
            style={({ pressed }) => [
              styles.googleButton,
              pressed && styles.googleButtonPressed,
            ]}
            onPress={signIn}
            disabled={false}
          >
            {false ? (
              <ActivityIndicator
                size="small"
                color={COLORS.colors.text.onPrimary}
              />
            ) : (
              <>
                <MaterialCommunityIcons
                  name="google"
                  size={20}
                  color="#EA4335"
                  style={styles.googleIcon}
                />
                <Text style={styles.googleButtonText}>
                  Continue with Google
                </Text>
              </>
            )}
          </Pressable>

          {/* Sign Up Link */}
          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>New here?</Text>
            <Link href="/(auth)/signup" asChild>
              <Pressable>
                <Text style={styles.signUpLink}>Create an account</Text>
              </Pressable>
            </Link>
          </View>

          {/* Spacer */}
          <View style={styles.spacer} />

          {/* Terms and Privacy */}
          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
              By continuing, you agree to our{" "}
            </Text>
            <Link href="https://example.com/terms" asChild>
              <Pressable>
                <Text style={styles.termsLink}>Terms of Service</Text>
              </Pressable>
            </Link>
            <Text style={styles.termsText}> and </Text>
            <Link href="https://example.com/privacy" asChild>
              <Pressable>
                <Text style={styles.termsLink}>Privacy Policy</Text>
              </Pressable>
            </Link>
            <Text style={styles.termsText}>.</Text>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

export default SignInScreen;

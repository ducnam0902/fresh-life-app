import { useLoadingStore } from "@/store/loadingStore";

import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { Image } from "expo-image";
import React from "react";
import { Pressable, Text, View } from "react-native";
import styles from "./index.style";
import { supabase } from "@/utils/supabase";
import { useRouter } from "expo-router";
import { useAuthStore } from "@/store/authStore";

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
      <Image source={require("@/assets/fresh-logo.png")} style={styles.logo} />
      <Text style={styles.title}>Manage Life & Money</Text>
      <Text style={styles.subTitle}>
        Track your tasks and budget in one place.
      </Text>
      <Pressable style={styles.signInButton} onPress={() => signIn()}>
        <Image
          source={{ uri: "https://img.icons8.com/color/48/google-logo.png" }}
          style={styles.googleIcon}
        />
        <Text style={styles.signInText}>Sign in with Google</Text>
      </Pressable>
    </View>
  );
};

export default SignInScreen;

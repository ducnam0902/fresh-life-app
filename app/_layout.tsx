import LoadingScreen from "@/components/LoadingScreen";
// import { useAuthStore } from "@/store/authStore";
import { useLoadingStore } from "@/store/loadingStore";
import { Stack, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import SafeScreen from "../components/SafeScreen";
import { useAuthStore } from "@/store/authStore";
import Toast from 'react-native-toast-message';

export default function RootLayout() {
  const { userInfo, setUser } = useAuthStore();
  const { isLoading } = useLoadingStore();
  const [initializing, setInitializing] = useState(true);
  const segments = useSegments();
  const isAuthSegment = segments[0] === "(auth)";

  return (
    <GestureHandlerRootView>
      <SafeScreen>
        <StatusBar />
        {isLoading && <LoadingScreen />}
        <Stack>
          <Stack.Protected guard={!Boolean(userInfo)}>
            <Stack.Screen
              name="(auth)"
              options={{ headerShown: false, animation: "none" }}
            />
          </Stack.Protected>
          <Stack.Protected guard={Boolean(userInfo)}>
            <Stack.Screen
              name="(tab)"
              options={{
                headerShown: false,
                animation: isAuthSegment ? "default" : "none",
              }}
            />
          </Stack.Protected>
          <Stack.Protected guard={Boolean(userInfo)}>
            <Stack.Screen
              name="(modal)/addTask"
              options={{
                headerShown: false,
                presentation: "fullScreenModal",

              }}
              
            />
          </Stack.Protected>
        </Stack>
         <Toast />
      </SafeScreen>
    </GestureHandlerRootView>
  );
}

import LoadingScreen from "@/components/LoadingScreen";
// import { useAuthStore } from "@/store/authStore";
import { useAuthStore } from "@/store/authStore";
import { useLoadingStore } from "@/store/loadingStore";
import { Stack, useSegments } from "expo-router";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import SafeScreen from "../components/SafeScreen";

export default function RootLayout() {
  const { userInfo, setUser } = useAuthStore();
  const { isLoading } = useLoadingStore();
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
            <Stack.Screen
              name="(modal)/addTask"
              options={{
                headerShown: false,
                presentation: "modal",
              }}
            />
            <Stack.Screen
              name="(screens)/TaskDetails/[id]"
              options={{
                headerShown: false,
              }}
            />
          </Stack.Protected>
        </Stack>
        <Toast />
      </SafeScreen>
    </GestureHandlerRootView>
  );
}

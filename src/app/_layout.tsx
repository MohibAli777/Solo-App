import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "@/features/auth/providers/AuthProvider";

export default function RootLayout() {
  return (
    <AuthProvider>
       <StatusBar
        style="dark"
        // backgroundColor="#F8FAFC"
        // translucent={false}
      />
      <Stack screenOptions={{ headerShown: false }} />
    </AuthProvider>
  );
}
import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
        gestureEnabled: true,
        contentStyle: {
          backgroundColor: "#FFFFFF",
        },
      }}
    >
      {/* <Stack.Screen name="Login" />
      <Stack.Screen name="Signup" /> */}
    </Stack>
  );
}
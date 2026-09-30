import { Redirect, Slot } from "expo-router";

import { useAuth } from "@/features/auth/providers/AuthProvider";

export function AuthGuard() {
  const { session, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (!session) {
    return <Redirect href="/(auth)/Login" />;
  }

  return <Slot />;
}
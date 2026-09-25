import { useEffect } from "react";
import { useRouter } from "expo-router";
import "../../global.css";
import { appStorage } from "@/lib/storage";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const initializeApp = async () => {
      const completed = await appStorage.hasCompletedOnboarding();

      if (!completed) {
        router.replace("/(onboarding)");
      } else {
        router.replace("/(auth)/Login");
      }
    };

    initializeApp();
  }, [router]);

  return null;
}
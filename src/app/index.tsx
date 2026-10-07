import { useEffect } from "react";
import { useRouter } from "expo-router";
import "../../global.css";

import { appStorage } from "@/lib/storage";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    let mounted = true;

    const initializeApp = async () => {
      try {
        const completed =
          await appStorage.hasCompletedOnboarding();

        if (!mounted) return;

        if (completed) {
          router.replace("/(auth)/Login");
        } else {
          router.replace("/(onboarding)");
        }
      } catch (error) {
        console.error(
          "[App] Failed to initialize:",
          error
        );

        if (mounted) {
          router.replace("/(onboarding)");
        }
      }
    };

    initializeApp();

    return () => {
      mounted = false;
    };
  }, [router]);

  return null;
}
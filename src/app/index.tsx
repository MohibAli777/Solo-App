import { useEffect } from "react";
import { useRouter } from "expo-router";
import "../../global.css";

import { appStorage } from "@/lib/storage";
import { supabase } from "@/lib/supabase/client";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    let mounted = true;

    const initializeApp = async () => {
      try {
        const [
          onboardingCompleted,
          { data, error },
        ] = await Promise.all([
          appStorage.hasCompletedOnboarding(),
          supabase.auth.getSession(),
        ]);

        if (!mounted) return;

        if (!onboardingCompleted) {
          router.replace("/(onboarding)");
          return;
        }

        if (error) {
          console.error("[App] Session check failed:", error);
          router.replace("/(auth)/Login");
          return;
        }

        if (data.session) {
          router.replace("/(main)");
        } else {
          router.replace("/(auth)/Login");
        }
      } catch (error) {
        console.error("[App] Initialization failed:", error);

        if (mounted) {
          router.replace("/(auth)/Login");
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
